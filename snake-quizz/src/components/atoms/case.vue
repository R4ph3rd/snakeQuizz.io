<template>
  <div class=" case none" :style="this.owner ? 'background:' + color : ''"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Case',
    props:{
        owner:{
            type:String,
            required:false,
        }
    },
    data(){
        return {
            color:  'rgba(130,130,130)' //this.owner ? this.$store.state.players[this.owner].color :
        }
    },
    mounted(){
        if(this.owner){
            this.color = this.$store.state.players[this.owner].color
        }
    },
    /* watch:{
        color(newval, oldval){
            this.$forceUpdate();
        }
    } */
}
</script>

<style scoped lang="scss">
.none{
    background: $gray06;
}

div{
    width:100%;
    height:100%;
}

.hightlight::after{
    content: ' ';
    position:absolute;
    width:100%;
    height:100%;
    opacity:.5;
    top:0;
    left:0;
    background: var(--color);
}

</style>