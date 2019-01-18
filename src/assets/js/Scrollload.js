import throttle from './throttle'

function noop() {}
export default class Scrollload {
    static defaultOptions = {
        // 是否开启加载更多
        enableLoadMore: true,
        // 初始化的时候是否锁定，锁定的话则不会去加载更多
        isInitLock: false,
        // 阀值
        threshold: 10,
        // 视窗
        window: window,

        // 底部加载中的html
        loadingHtml: '',
        // 底部没有更多数据的html
        noMoreDataHtml: '',
        // 底部出现异常的html
        exceptionHtml: '',
        // 加载更多的回调
        loadMore: noop,

        // 是否开启下拉刷新
        enablePullRefresh: false,
        // 顶部下拉刷新的html
        notEnoughRefreshPortHtml: '',
        // 顶部松开刷新的html
        overRefreshPortHtml: '',
        // 顶部正在刷新的html
        refreshingHtml: '',
        // 下拉刷新的回调
        pullRefresh: noop,
        // 到达刷新点的回调(包括向上和向下，可以通过isMovingDown判断方向)
        arrivedRefreshPortHandler: noop,
        // 开始滑动的回调
        touchStart: noop,
        // 滑动时的回调
        touchMove: noop,
        // 滑动中松开手指的回调
        touchEnd: noop,
        // 超过可刷新位置后的监听函数
        overRefreshPortHandler: noop,
        // 未超过可刷新位置前的监听函数
        notEnoughRefreshPortHandler: noop,

        // 计算下拉的阻力函数
        calMovingDistance(distance) {
            return distance / 3
        },

        // 实例化完后的回调
        initedHandler: noop,
    }

    constructor(options = {}) {
        this._options = Object.assign({}, Scrollload.defaultOptions, options)
        const container = this._options.container || document.querySelector('.scrollload-container')
        this.container = container
        if (!(container instanceof HTMLElement)) {
            throw new Error('container must be a HTMLElement instance!')
        }

        this.win = this._options.window
        this.isGlobalScroll = this.win === window

        this.contentDom = this._options.content || this.container.querySelector('.scrollload-content')
        if (!(this.contentDom instanceof HTMLElement)) {
            throw new Error('content must be a HTMLElement instance!')
        }

        if (this._options.enableLoadMore) {
            this.windowHeight = window.innerHeight
            this.isLock = this._options.isInitLock
            // 是否有更多数据了
            this.hasMoreData = true

            this.createBottomDom()

            this.scrollListener = this.scrollListener.bind(this)
            this.resizeListener = this.resizeListener.bind(this)

            //对滚动和resize的监听函数设置节流
            this.scrollListenerWrapThrottle = throttle(this.scrollListener, 50)
            this.resizeListenerWrapThrottle = throttle(this.resizeListener, 50)

            this.attachScrollListener()
        }

        if (this._options.enablePullRefresh) {
            this.createTopDom()
            // 开始滑动时候的pageY
            this.startPageY = 0
            // 滑动时的前一个pageY
            this.prePageY = 0
            // 内容是否在滑动中
            this.isMoving = false
            // 是否是向下滑动
            this.isMovingDown = true
            // 是否在刷新中
            this.isRefreshing = false
            // 滑动的距离
            this.distance = 0
            // 是否有执行touchStart函数, 刷新中不允许去滑动内容
            this.enterTouchStart = false

            this.touchStart = this.touchStart.bind(this)
            this.touchMove = this.touchMove.bind(this)
            this.touchEnd = this.touchEnd.bind(this)

            this.attachTouchListener()
        }

        this._options.initedHandler.call(this, this)
    }

    createBottomDom() {
        this.container.insertAdjacentHTML(
            'beforeend',
            `<div class="scrollload-bottom">${this._options.loadingHtml}</div>`
        )
        this.bottomDom = this.container.querySelector('.scrollload-bottom')
    }

    // 计算向下滑动距离的函数
    calMovingDistance(distance) {
        this.distance = this._options.calMovingDistance(distance)
    }

    isTop() {
        return this.isGlobalScroll ? window.pageYOffset <= 0 : this.win.scrollTop <= 1
    }

    attachTouchListener() {
        this.container.addEventListener('touchstart', this.touchStart)
        this.container.addEventListener('touchmove', this.touchMove)
        this.container.addEventListener('touchend', this.touchEnd)
    }

    touchStart(event) {
        // 初始化的时机：只要不是正在刷新都应该做初始化操作
        if (this.isRefreshing) {
            this.enterTouchStart = false
            return
        }
        // touchmove中通过判断这个值可以推断出touchstart中有没有做初始化
        this.enterTouchStart = true

        this.startPageY = this.prePageY = event.touches[0].pageY
        // 在滑动的时候是不需要过渡动画的
        setStyles([this.topDom, this.contentDom, this.bottomDom, this.topContentDom], {
            transition: 'none',
        })
        this.showNotEnoughRefreshPortDom()

        // 多tab切换的时候可能实例化可能为隐藏的情况
        if (this.topContentDomHeight === 0) {
            this.topContentDomHeight = this.topContentDom.clientHeight
            this.topContentDomWidth = this.topContentDom.clientWidth
            this.topDom.style.top = `-${this.topContentDomHeight}px`
        }

        this._options.touchStart.call(this, this)
    }

    touchMove(event) {
        // 如果touchstart中没有做初始化，那么这里不应该执行下去了。
        if (!this.enterTouchStart) {
            return
        }

        const pageY = event.touches[0].pageY
        this.isMovingDown = pageY >= this.prePageY

        if (this.isMoving) {
            // 如果是在滑动中，计算出滑动的距离
            this.calMovingDistance(pageY - this.startPageY)
            this.movingHandler()

            // 阻止滚动
            event.preventDefault()
        } else if (this.isTop() && this.isMovingDown) {
            // 如果滑动的时候此时在最高的位置并且是向下滑动的，那么那些dom就可以滑动了。
            this.isMoving = true

            // 阻止滚动
            event.preventDefault()
        }

        this._options.touchMove.call(this, this)

        this.prePageY = pageY
    }

    touchEnd(event) {
        // 如果此时不在滑动中，就不用做一些重置的操作
        if (!this.isMoving) {
            return
        }

        this._options.touchEnd.call(this, this)

        // 如果此时是可刷新的位置，那么触发刷新操作。否则直接触发刷新完成的操作
        if (this.isOverRefreshPort()) {
            this.triggerPullResfresh()
        } else {
            this.refreshComplete()
        }

        this.startPageY = this.prePageY = 0
        this.isMoving = false
    }

    scrollListener() {
        if (this.isLock) {
            return
        }

        if (this.isBottom()) {
            this.isLock = true
            this._options.loadMore.call(this, this)
        }
    }

    // 是否滚动到底部
    isBottom() {
        const {
            win,
            bottomDom,
            windowHeight
        } = this
        let bottomDomTop = bottomDom.getBoundingClientRect().top
        let winHeight

        if (this.isGlobalScroll) {
            winHeight = windowHeight
        } else {
            const {
                height,
                top
            } = win.getBoundingClientRect()
            winHeight = height
            bottomDomTop = bottomDomTop - top
        }

        return bottomDomTop - winHeight <= this._options.threshold
    }

    resizeListener() {
        //更新缓存的windowHeight
        if (this.isGlobalScroll) {
            this.windowHeight = window.innerHeight
        }
        this.scrollListener()
    }

    attachScrollListener() {
        this.win.addEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.addEventListener('resize', this.resizeListenerWrapThrottle)
        this.scrollListener()
    }

    detachScrollListener() {
        this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.removeEventListener('resize', this.resizeListenerWrapThrottle)
    }

    lock() {
        this.isLock = true
    }

    unLock() {
        this.isLock = false
        if (this.hasMoreData) {
            this.scrollListener()
        }
    }

    noMoreData() {
        this.lock()

        this.hasMoreData = false
        this.showNoMoreDataDom()

        this.detachScrollListener()
    }

    refreshData() {
        this.showLoadingDom()

        this.isLock = false
        this.hasMoreData = true

        this.attachScrollListener()
    }

    throwException() {
        this.showExceptionDom()
    }

    solveException() {
        if (this.hasMoreData) {
            this.showLoadingDom()
            this.unLock()
        } else {
            this.showNoMoreDataDom()
        }
    }

    setOptions(options) {
        Object.assign(this._options, options)
    }

    getOptions() {
        return assign({}, this._options)
    }

    static setGlobalOptions(options) {
        Object.assign(Scrollload.defaultOptions, options)
    }
}