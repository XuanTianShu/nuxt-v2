<template>
  <RootView>
    <div @click="demo">主体

     
    </div>
  </RootView>
</template>

<script>
export default {
  name: 'IndexPage',
  head:{
    title:'佰艺色彩'
  },
  data() {
    return {
      position: null
    };
  },
 
  mounted() {
    this.getLocation();
  },
  methods:{
    demo(){
      this.$axios.get(`index/index`).then(res => {
        console.log(res)
      })
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position);
          
          this.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        error => {
          this.error = error.message;
        }
      );
    }
  }
}
</script>
