<template>
  <div class="test-util">
    <p>测试事件总线</p>
    <button @click="downloadImg">下载图片</button>
    <button @click="parseImg">解析图片</button>
    <div class="upload">
      <input type="file"
        ref="uploader"
        class="file"
        @change="getFile">
    </div>
    <div id="box">
      <p>{{result}}</p>
      <p v-for="(test, index) in tests"
        :key="index">{test}</p>

      <!-- <button @click.stop="shuffleTheArr">shuffle</button>
      <button @click.stop="uniqueTheArr">unique</button> -->
    </div>
    <p>{{busValue}}</p>
    <div>
    </div>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
import _ from 'lodash'
import ScrollLoad from '@/assets/js/scroll-loading.js'
import jsonToImg from '@/assets/js/jsonToImg.js'
import { imgToJson } from '@/assets/js/jsonToImg.js'
import img from '@/assets/img/image.png'
import Stats from '@/assets/js/Stats.js'
import util from '@/assets/js/dtc.util.es.js'
export default {
  name: 'TestUtil',
  components: {},
  model: {},
  props: {},
  data() {
    return {
      busValue: '',
      personA: {
        name: 'zhangsan',
        family: {
          father: 'laozhang',
          mather: 'li'
        },
        age: 22
      },
      personB: {
        name: 'wudi',
        family: {
          father: 'laowu',
          mother: 'zhao'
        },
        age: 18
      },
      scrollIns: null,
      tests: [],
      result: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$bus.$on('message', value => {
      this.busValue = value
    })
    this.$nextTick(() => {
      // todo
      // this.initScroll()
    })
  },
  mounted() {
    let option = {
      dragable: true,
      x: 0,
      y: 0,
      container: '#app'
    }
    var stats = new Stats(option)
    // stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom

    function animate() {
      // stats.begin()

      // monitored code goes here

      stats.update()

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
    let b = new util.Browser()
    console.log(b)
    
  },
  beforeDestroy() {},
  methods: {
    initScroll() {
      this.scrollIns = new ScrollLoad({
        // selector: '#box',
        callback: this.srcollBack
      })
    },
    srcollBack(status) {
      if (this.tests.length > 30) {
        this.scrollIns.off()
      }
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.tests.push('testt')
        }
      }, 200)

      // console.log('scrolll')
    },
    downloadImg() {
      let data = {
        name: 'buybook',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'vue-cli-service serve',
          build: 'vue-cli-service build',
          lint: 'vue-cli-service lint',
          test: 'mocha --recursive',
          'docs:dev': 'vuepress dev docs',
          'docs:build': 'vuepress build docs',
          name: '北京'
        },
        dependencies: {
          jflib: '^1.0.1',
          lodash: '^4.17.11',
          'pubsub-js': '^1.7.0',
          vue: '^2.5.21',
          'vue-router': '^3.0.2',
          vuex: '^3.0.1',
          xlsx: '^0.14.1'
        }
      }

      jsonToImg(data)
    },
    parseImg() {
      imgToJson(img)
    },
    getFile(ev) {
      let reader = new FileReader()
      reader.readAsArrayBuffer(ev.target.files[0])
      // arrow function处理this指向问题
      reader.onload = ev => {
        // array buffer to json
        imgToJson(reader.result).then(result => {
          this.result = result
          // 处理选择相同文件不触发change事件
          this.$refs.uploader.value = ''
        })
      }
    },
    sentCDNpr() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.upload {
  height: 200px;
  background-color: rgb(226, 178, 178);
  .file {
    background-color: transparent;
    border: none;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
#box {
  // height: 300px;
  // overflow: auto;
  background-color: rgb(128, 88, 88);
  padding: 3px;
}
</style>