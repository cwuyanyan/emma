<template>
  <div class="welcome">

  <swiper :options="swiperOption">
    <swiper-slide>
            <img src="../assets/img/s1.png" alt="/" />
    </swiper-slide>
    <swiper-slide>
            <img src="../assets/img/s2.png" alt="/" />
    </swiper-slide>
    <swiper-slide>
            <img src="../assets/img/s3.png" alt="/" />
    </swiper-slide>
    <swiper-slide>
            <mu-raised-button label="立即体验" class="start" @click="startapp" secondary/>
            <img src="../assets/img/s4.png" alt="/" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</div>
</template>

<script>
export default {
   name: 'carrousel',
   data() {
     return {
       swiperOption: {
         setWrapperSize :true,
         pagination : '.swiper-pagination',
         paginationClickable :true,
         mousewheelControl : true,
         observeParents:true,
         resistanceRatio : 0,
         welcomestate:"",
       },
      //  items: [
      //    require('../assets/img/s1.png'),
      //    require('../assets/img/s2.png'),
      //    require('../assets/img/s3.png'),
      //  ],
     }
   },
   watch: {

   },
   created() {

   },
   methods:{

     startapp(){
       var _this=this;
       //vue 状态设置为 true
       _this.$store.dispatch('changeWelcomeState', true);
       _this.core.platformCore.methods.setLocalStorage('welcomestate', true);//本地保存欢迎页状态
     },

   },
   mounted() {

   }
 }
</script>
