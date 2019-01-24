<template>
  <div class="cdn">
    <input type="text" v-model="url" placeholder="url">
    <button @click.stop='cdnTrigger'>CDN trigger</button>
  </div>
</template>
<script>
import axios from 'axios'
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
export default {
  name: '',
  components: {},
  model: {},
  props: {},
  data() {
    return {
      url: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    cdnTrigger() {
      console.warn('没有token')
      return
      let xhr = axios.create({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Travis-API-Version': 3,
          Authorization: 'token '
        }
      })
      xhr({
        method: 'post',
        url: 'https://api.travis-ci.com/repo/wuyax%2Fcdn/requests',
        data: {
          request: {
            message: 'this commit is from TravisCI',
            branch: 'master',
            config: {
              script:
                `curl -O ${this.url}`
            }
          }
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.cdn {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  input {
    width: 400px;
  }
}
</style>