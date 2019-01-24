/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function (option = {
	dragable: false,
	x: 0,
	y: 0
}) {

	var mode = 0;
	let isDrag = false;
	let mousedownTime, mouseupTime

	var container = document.createElement('div');
	container.style.cssText = `position:fixed;top:${option.y || 0}px;left:${option.x || 0}px;cursor:pointer;opacity:0.9;z-index:10000`;
	container.addEventListener('click', function (event) {

		event.preventDefault();
		if (!isDrag) {
			showPanel(++mode % container.children.length);
		}
	}, false);

	if (option.dragable) {
		container.addEventListener('mousedown', function (event) {
			event.preventDefault()
			if (isDrag) {
				isDrag = false
			}
			this.style.cursor = 'move'
			mousedownTime = new Date().getTime()
			move(event)
		}, false)
		container.addEventListener('mouseup', function (event) {
			event.preventDefault()
			mouseupTime = new Date().getTime()
			if ((mouseupTime - mousedownTime) > 200) {
				isDrag = true;
			}
			this.style.cursor = 'pointer'
		}, false)
		container.addEventListener('mouseout', function () {
			event.preventDefault()
			this.style.cursor = 'pointer'
		}, false)
	}
	/**
	 * 移动
	 * @param {object} event 事件
	 */
	function move(event) {
		let offsetX = parseInt(container.getBoundingClientRect().left); // 获取当前的x轴距离
		let offsetY = parseInt(container.getBoundingClientRect().top); // 获取当前的y轴距离
		let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
		let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距

		document.onmousemove = function (event) {
			// container.style.left = event.clientX - innerX + "px";
			// container.style.top = event.clientY - innerY + "px";
			let tx = event.clientX - innerX - (option.x || 0)
			let ty = event.clientY - innerY - (option.y || 0)
			// 边界判断
			if (parseInt(tx + (option.x || 0)) <= 0) {
				tx = -(option.x || 0)
			}
			if (parseInt(ty + (option.y || 0)) <= 0) {
				ty = -(option.y || 0)
			}
			if (parseInt(tx + (option.x || 0)) >= window.innerWidth - parseInt(getComputedStyle(container).width)) {
				tx = window.innerWidth - parseInt(getComputedStyle(container).width) - (option.x || 0)
			}
			if (parseInt(ty + (option.y || 0)) >= window.innerHeight - parseInt(getComputedStyle(container).height)) {
				ty = window.innerHeight - parseInt(getComputedStyle(container).height) - (option.y || 0)
			}
			// 设置变形
			container.style.transform = `translate(${tx}px,${ty}px)`;
		}
		// 鼠标抬起时，清除绑定在文档上的mousemove和mouseup事件
		// 否则鼠标抬起后还可以继续拖拽方块
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
			document.onmouseout = null
		}
	}

	//
	function addPanel(panel) {

		container.appendChild(panel.dom);
		return panel;

	}

	function showPanel(id) {

		for (var i = 0; i < container.children.length; i++) {

			container.children[i].style.display = i === id ? 'block' : 'none';

		}

		mode = id;

	}

	//

	var beginTime = (performance || Date).now(),
		prevTime = beginTime,
		frames = 0;

	var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
	var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

	if (self.performance && self.performance.memory) {

		var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));

	}

	showPanel(0);

	if (option.container && (typeof option.container === 'object')) {
		option.container.appendChild(container)
	} else if (option.container && (typeof option.container === 'string')) {
		option.container = document.querySelector(option.container)
		option.container.appendChild(container)
	} else {
		document.body.appendChild(container)
	}

	return {

		REVISION: 16,

		dom: container,

		addPanel: addPanel,
		showPanel: showPanel,

		begin: function () {

			beginTime = (performance || Date).now();

		},

		end: function () {

			frames++;

			var time = (performance || Date).now();

			msPanel.update(time - beginTime, 200);

			if (time >= prevTime + 1000) {

				fpsPanel.update((frames * 1000) / (time - prevTime), 100);

				prevTime = time;
				frames = 0;

				if (memPanel) {

					var memory = performance.memory;
					memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);

				}

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		},

		// Backwards Compatibility

		domElement: container,
		setMode: showPanel

	};

};

Stats.Panel = function (name, fg, bg) {

	var min = Infinity,
		max = 0,
		round = Math.round;
	var PR = round(window.devicePixelRatio || 1);

	var WIDTH = 80 * PR,
		HEIGHT = 48 * PR,
		TEXT_X = 3 * PR,
		TEXT_Y = 2 * PR,
		GRAPH_X = 3 * PR,
		GRAPH_Y = 15 * PR,
		GRAPH_WIDTH = 74 * PR,
		GRAPH_HEIGHT = 30 * PR;

	var canvas = document.createElement('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.cssText = 'width:80px;height:48px';

	var context = canvas.getContext('2d');
	context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect(0, 0, WIDTH, HEIGHT);

	context.fillStyle = fg;
	context.fillText(name, TEXT_X, TEXT_Y);
	context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

	return {

		dom: canvas,

		update: function (value, maxValue) {

			min = Math.min(min, value);
			max = Math.max(max, value);

			context.fillStyle = bg;
			context.globalAlpha = 1;
			context.fillRect(0, 0, WIDTH, GRAPH_Y);
			context.fillStyle = fg;
			context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

			context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

			context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));

		}

	};

};

export {
	Stats as
	default
};
// module.exports = Stats