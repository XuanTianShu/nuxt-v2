<template>
  <div v-show="show" class="model">
    <div class="modo" @click="show = false"></div>
    <div class="main">
      <video v-show="show == 'video'" ref="videoPlayer" controls></video>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    play(url) {
      this.$refs.videoPlayer.src = url;
      this.show = "video";
    },
  },
};
</script>
<style lang="scss" scoped>
.model {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modo {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #00000073;
  z-index: 1;
}
.main {
  position: relative;
  z-index: 999;
  video {
    min-width: 300px;
    max-width: 50vw;
    width: 50vw;
    height: 40vw;
  }
}
.preview {
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    max-width: 90%;
    width: auto;
    max-height: 90vh;
    height: 100%;
  }
}
</style>
