<template>
  <div class=" case none" :style="this.myOwner ? 'background:' + color : ''" :id="idCase" :class="highlight" @click="emitId()"></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Case',
    props:{
        owner:{
            type:String,
            required:false,
        }, 
        idCase: {
            type: String,
            required :true
        }
    },
    data(){
        return {
            myOwner: this.owner != (null || undefined) ? this.owner.slice(0, this.owner.length) : null,
            oldOwner: this.owner != (null || undefined) ? this.owner.slice(0, this.owner.length) : null,
            color:  'rgba(130,130,130)' //this.owner ? this.$store.state.players[this.owner].color :
        }
    },
    methods:{
        emitId(){
            if(this.$store.state.move){
                this.$emit('moveHere', this.idCase);
                this.myOwner = this.$store.state.playerTurn.slice(0, this.$store.state.playerTurn.length);
                this.color = this.$store.state.players[this.myOwner].color;
            }
        },
        changeOwner(newOwner){
            this.oldOwner = this.myOwner;
            this.myOwner = newOwner;
            this.color = this.$store.state.players[this.myOwner].color;

            console.log('------------------ owner forced change -------------')
                console.log(this.oldOwner, this.myOwner, this.idCase)
        }
    },
    computed:{
        highlight(){
            let pawnCase = this.$store.state.players[this.$store.state.playerTurn].pawnPos
            if(pawnCase){
                let cross = [
                'case-' + (parseInt(pawnCase.split('-')[1]) - 20),
                'case-' + (parseInt(pawnCase.split('-')[1]) + 20),
                'case-' + (parseInt(pawnCase.split('-')[1]) - 1),
                'case-' + (parseInt(pawnCase.split('-')[1]) + 1)
            ]

                // console.log('hightlight', cross, this.idCase, cross.includes(this.idCase))
                if(cross.includes(this.idCase)){
                    if(this.$store.state.move){
                        return 'highlight'
                    }
                }
            }
        },
    },
    mounted(){
        if(this.owner){
            this.color = this.$store.state.players[this.owner].color
        }
    },
    watch:{
        owner : {
            handler(newval, oldval){
                console.log('------------------ owner changed -------------')
                console.log(newval, oldval, this.oldOwner, this.myOwner, this.idCase)
                this.myOwner = newval;
            },
            deep: true
        },
        color : {
            handler(newval, oldval){
                console.log('color changed', newval, oldval, this.oldOwner, this.myOwner, this.idCase)
            },
        },
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

.highlight{
    &:hover{
        cursor:pointer;
    }

    &::after{
        content: ' ';
        position:absolute;
        width:100%;
        height:100%;
        opacity:.7;
        top:0;
        left:0;
        background: white;

        &:hover{
            cursor:pointer;
        }
    }
}

</style>