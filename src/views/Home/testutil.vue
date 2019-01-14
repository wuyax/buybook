<template>
  <div class="test-util">
    <p>测试事件总线</p>
    <div>
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
export default {
  name: 'TestUtil',
  components: {},
  model: {},
  props: {},
  data() {
    return {
      busValue: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$bus.$on('message', value => {
      this.busValue = value
    })
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>