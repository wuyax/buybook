<template>
  <div class="test-util">
    <p>工具测试</p>
    <div>
      <button @click.stop="shuffleTheArr">shuffle</button>
      <button @click.stop="uniqueTheArr">unique</button>
    </div>
    <p>{{a}}</p>
    <div>
    </div>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
// import JFE from 'jflib'
// import {util} from 'jflib'
import isqueal from 'lodash.isequal'
export default {
  name: 'TestUtileee',
  components: {},
  model: {},
  props: {},
  data() {
    return {
      a: [3, 4, 4, 33, 4, 3, 4]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  beforeDestroy() {},
  methods: {
    shuffleTheArr() {
      this.a = JFE.util.arrShuffle(this.a)
    },
    uniqueTheArr() {
      this.a = util.unique(this.a)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>