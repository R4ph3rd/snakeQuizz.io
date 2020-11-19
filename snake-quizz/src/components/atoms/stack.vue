<template>
  <div>
      <h2>Verbleibende Fragen</h2>
      <div class="stock">
          <p>{{$store.state.currentStack}}</p>
          <span class="line"></span>
          <p>{{$store.state.totalStack}}</p>
      </div>
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
            `;
            /* background: ${this.$store.state.players[this.$store.state.playerTurn].color} */
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

    .stock{
        width:100%;
        max-width:60px;
        height:max-content;
        margin-bottom:12px;

        p {
            font-weight:700;
        }

        span{
            width:100%;
            height:2px;
            padding:0;
            margin-top:8px;
            margin-bottom:8px;
        }
    }

    span{
        height:75%;
        width:80px;
        display:flex;
        align-items:flex-end;
        justify-content: center;
        padding: 8px;
        background:$gray06;

        #currentStack{
            background: $gray02;
            width:100%;
        }
    }

}
</style>