<template>
  <div>
      <h2>Questions stack</h2>
      <span>
          <span id="currentStack" :style="height"></span>
      </span>
  </div>
</template>

<script>
export default {
    name: 'Stack',
    computed:{
        height(){
            return `
            height: ${this.$store.state.currentStack/this.$store.state.totalStack * 100}%;
            background: ${this.$store.state.players[this.$store.state.playerTurn].color}
            `;
        },

    }
}
</script>

<style scoped lang="scss">
div{
    height:100%;
    display:flex;
    align-items: center;
    flex-direction: column;

    h2{
        text-align: center;
        margin-bottom:20px;
    }

    span{
        height:80%;
        width:80px;
        display:flex;
        align-items:flex-end;
        justify-content: center;
        padding: 8px;
        background:$gray06;

        #currentStack{
            background: $gray04;
            width:100%;
        }
    }

}
</style>