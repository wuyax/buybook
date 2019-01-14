<template>
  <div class="list">
    <p>{{changeName2 && changeName2.age}}</p>
    <!-- <button @click="beginSub">开始订阅</button> -->
    <!-- <button @click="cancelSub">取消订阅</button> -->
    <button @click.stop='globeMethod'>发布全局方法</button>
    <br/>
    <button @click.stop='busEv'>bus事件</button>
    <input type="text" v-model="busmessage">
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
    return {
      busmessage:''
    }
  },
  computed: {
    ...mapState(['changeName2'])
  },
  watch: {
    changeName2: {
      handler: function(nv, ov) {
        console.log(nv.age, ov)
      }
    }
  },
  created() {},
  mounted() {
    this.$messenger.regist('teta')
  },
  beforeDestroy() {},
  methods: {
    globeMethod() {
      this.$messenger.publish('teta', {name: 'test'})
    },
    busEv() {
      this.$bus.$emit('message', this.busmessage)
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  padding: 20px 0;
}
</style>