<template>
  <div class="codepen-support">
    <!-- loading 效果 -->
    <div class="loading">
      <svg id="load"
        x="0px"
        y="0px"
        viewBox="0 0 150 150">
        <circle id="loading-inner"
          cx="75"
          cy="75"
          r="60" />
      </svg>
    </div>
    <!-- codepen -->
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
.codepen-support {
  background-color: #3eaf7c30;
  position: relative;
  .loading {
    position: absolute;
    z-index: -1;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: center;
  }
  #load {
    width: 150px;
    animation: loading 3s linear infinite;
    #loading-inner {
      stroke: {
        dashoffset: 0;
        dasharray: 300;
        width: 10;
        miterlimit: 10;
        linecap: round;
      }
      animation: loading-circle 2s linear infinite;
      stroke: #51bba7;
      fill: transparent;
    }
  }
  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading-circle {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -600;
    }
  }
}
</style>