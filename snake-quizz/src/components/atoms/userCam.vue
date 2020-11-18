<template>
  <div class="videoUser" :style="params">
      <!-- <video v-if="pic != null" src=""></video> -->
      <img :src="pic" alt="">

      <p v-if="userDisplay">{{username}}</p>
  </div>
</template>

<script>
export default {
    name:'UserCam',
    props: {
        me: {
            type: Boolean,
            required: false,
        },
        stream: {
            required: false
        },
        pic: {
            required: false,
            type: String,
            default: null
        },
        username: {
            type: String,
            required: false
        },
        width:{
            type: Number,
            required: false
        },
        height:{
            type: Number,
            required: false
        }
    },
    computed: {
        userDisplay(){
            return !this.me;
        },
        params(){
            let params = '';
            if(this.height){
                params += 'height:' + this.height + 'px;'; 
            }
            if(this.width){
                params += 'width:' + this.width + 'px;'; 
            }
            // console.log('params',params)
            return params;
        }
    },
    mounted(){
        this.$el.autoplay = true;
    }
}
</script>

<style scoped lang="scss">
.videoUser{
    width:200px;
    height:200px;

    display: grid;
    grid-template-rows: auto 30px;
    background-color:rgb(100,100,100);

    video {
        width:100%;
        height:100%;
    }

    img{
        width:100%;
        height:100%;
        object-fit: cover
    }

    p {
        display:flex;
        align-items:center;
        justify-content: center;
        padding:10px;
        text-align:center;
        background: rgb(50,50,50);
        color:white;
    }
}
</style>