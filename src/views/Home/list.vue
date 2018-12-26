<template>
  <div class="list">
    <p>{{changeName2 && changeName2.age}}</p>
    <button @click="beginSub">开始订阅</button>
    <button @click="cancelSub">取消订阅</button>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
import { mapState, mapActions } from 'vuex'
export default {
  name: 'List',
  components: {},
  model: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['changeName2'])
  },
  watch: {
    changeName2: {
      handler: function(nv, ov) {
        console.log(nv.age)
      }
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    beginSub() {
      this.pubsub.subscribe('TOPIC', (msg, data) => {
        console.log(`${msg}订阅了${data.age}`)
      })
    },
    cancelSub() {
      this.pubsub.unsubscribe('TOPIC')
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  padding: 20px 0;
}
</style>