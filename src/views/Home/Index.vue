<template>
  <div class="home-page">
    <p>Welcome to Buybook</p>
    <button @click="disAction">提交一个action</button>
    <p>{{changeName2 && changeName2.age}}</p>
    <!-- watch test -->
    <button @click.stop="changeArray">改变数组的值</button>
    <List v-loadOrder='0'></List>
    <cdn></cdn>
    <TestUtil></TestUtil>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
// import { mapState, mapActions } from 'vuex'
import AppState from '@/assets/js/appState'
import List from './list'
import cdn from './cdn'
import TestUtil from '@/views/Home/testutil.vue'

export default {
  name: 'IndexPage',
  myOption: '测试测试',
  components: {
    List,
    // Upload: () => import('@/views/Home/upload.vue'),
    TestUtil,
    cdn
  },
  model: {},
  props: {},
  data() {
    return {
      list: [
        { name: 'list1' },
        { name: 'list2' },
        { name: 'list3' },
        { name: 'list4' }
      ]
    }
  },
  computed: {
    // ...mapState(['changeName2'])
    ...AppState.getState(['changeName2', 'test'])
  },
  watch: {
    changeName2: {
      handler: function(nv, ov) {
        console.log(nv.age, ov)
      }
    },
    list: {
      handler: function(nv, ov) {
        console.log(nv, ov)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    // console.log(chunk)
    AppState.regist('changeName2', { age: 12 })
  },
  beforeDestroy() {},
  methods: {
    // ...mapActions(['publish']),
    disAction() {
      AppState.updated('changeName2', { name: 'zhang', age: Math.random() })
      /* this.publish({
        TOPIC: 'changeName2',
        name: 'zhangsan',
        age: Math.random()
      })
      this.pubsub.publish() */
      // this.pubsub.publish('TOPIC', { name: 'zhangsan', age: Math.random() })
      /* this.pubsub.publish('changeName2', {
        name: 'zhangsan',
        age: Math.random()
      }) */
    },
    changeArray() {
      this.list[1].name = 'listx'
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page {
}
</style>
