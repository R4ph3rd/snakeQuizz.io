<template>
  <div class="videoUser" :style="params" :class="myTurn ? 'teamMateTurn' : ''">
      <!-- <video v-if="pic != null" src=""></video> -->
      <img :src="pic" alt="">

      <p :style="teamColor">{{username == 'Oliver' ? username + ' (you)' : username}}</p>
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
    }, // team walk move to show
    computed: {
        userDisplay(){
            return !this.me;
        },
        teamColor(){
            return 'background:' + this.$store.state.players[this.$store.state.me].color;
        },
        params(){
            let params = '';
            if(this.height){
                params += 'height:' + this.height + 'px;'; 
            }
            if(this.width){
                params += 'width:' + this.width + 'px;'; 
            }
            params += '--color:' + this.$store.state.players[this.$store.state.me].color;
            // console.log('params',params)
            return params;
        },
        myTurn(){
            return this.$store.state.playerTurn == this.$store.state.me && this.$store.state.move && this.$store.state.teammates[this.$store.state.teamMateTurn] == this.username;
        }
    },
    mounted(){
        this.$el.autoplay = true;
    }
}
</script>

<style scoped lang="scss">
.videoUser{
    width:100%;
    height:100%;

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
        color:white;
    }

    &.teamMateTurn{
        border: 2px solid var(--color);
        box-shadow: 0 0 8px var(--color);
    }
}
</style>