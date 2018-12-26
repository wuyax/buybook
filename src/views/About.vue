<template>
  <div class="about">
    {{changeName2 && changeName2.age}}
  </div>
</template>
<script>
import {mapState} from 'vuex'
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
export default {
  name: 'About',
  components: {},
  model: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['changeName2'])
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>