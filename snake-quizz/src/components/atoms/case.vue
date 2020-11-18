<template>
  <div class=" case none" :style="'--color:' + color"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Case',
    data(){
        return {
            color: 'white'
        }
    },
    watch:{
        color(newval, oldval){
            console.log('cooooooool')
            console.log(newval)
        }
    }
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