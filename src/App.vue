<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>
<script>
  import Nav from '@/views/Nav/navigation.vue'
  export default {
    components: {
      Nav
    }
  }
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
