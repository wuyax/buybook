<template>
  <div class="upload-file">
    <input ref="inputbox"
      type="file"
      @change='change'>
  </div>
</template>
<script>
// https://cn.vuejs.org/v2/style-guide/#组件-实例的选项的顺序-推荐
export default {
  name: 'UploadFile',
  components: {},
  model: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    change(e) {
      // console.log(e)
      var file = this.$refs.inputbox.files[0]
      console.log(file)
      let url = this.getObjectURL(file)
      // console.log(url)
      if (window.FileReader) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function(e) {
          console.log(e)
        }
      }
    },
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      }
      return url
    }
  }
}
</script>
<style lang="scss" scoped>
</style>