<template>
  <p class="demo">
    {{ msg }}
    <button @click="showAlert">弹窗</button>
  </p>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello this is <demo-1>'
    }
  },
  methods: {
    showAlert() {
      alert('hello beijing!')
    }
  }
}
</script>
