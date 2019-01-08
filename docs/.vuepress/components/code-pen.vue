<template>
  <div class="codepen-support">
    <iframe :height='penHeight'
      scrolling='no'
      :title='penTitle'
      :src='penSrc'
      frameborder='no'
      allowtransparency='true'
      allowfullscreen='true'
      style='width: 100%;'>
    </iframe>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
export default {
  name: 'code-pen',
  components: {},
  model: {},
  props: {
    penHeight: {
      type: String,
      default: '340'
    },
    penTitle: {
      type: String,
      default: 'demo'
    },
    penSrc: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>