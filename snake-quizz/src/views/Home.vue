<template>
  <div class="home">

    <stack class="stack"></stack>

    <game-board class="game" @changeTurn="displayNewAlert()"></game-board>

    <section class="team" :style="'--color:' + color ">
      <div>
        <p>Team</p>
        <h2>{{$store.state.users[$store.state.users.length -1]}} team</h2>
      </div>
    </section> 

    <div class="alert" v-show="timeDown"> 
        <p>It's up to the <strong>{{$store.state.playerTurn}} team</strong> to play !</p>
    </div>
  </div>
</template>

<script>
import stack from '../components/atoms/stack'
import game from '../components/cells/game'

export default {
  name: 'Home',
  components: {
    'stack': stack,
    'game-board': game
  },
  data(){
    return {
      color: 'rgb(233, 78, 109)',
      timeDown: true
    }
  },
  computed:{
    notMyTurn(){
      return this.$store.state.playerTurn != "me";
    }
  },
  methods: {
    displayNewAlert(){
      this.timeDown = true ;
      setTimeout(() => this.timeDown = false, 2500)
    }
  },
  mounted(){
    this.color = this.$store.state.players[this.$store.state.me].color;
    setTimeout(() => this.timeDown = false, 1000)
  }
}
</script>

<style lang="scss" scoped>

.home{
  display:grid;
  grid-template-columns: auto 1fr auto;
  grid-row-gap:20px;

  .stack{
    grid-area:1/1/2/2;
  }

  .game{
    grid-area: 1 / 2 / 2 / 3;
    align-self: center;
    justify-self: center;
  }

  .team {
    grid-area: 1 / 3 / 2 / 4;

    & > div{
      margin-left:10px;

      *{
        text-align:left;
      }

      &::before{
        content:' ';
        position:absolute;
        left: -10px;
        top:0;
        width:4px;
        height:100%;
        background:var(--color);
      }
    }
  }
}
  .alert{
    background:white;
    padding:50px;
    z-index:100;

    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100vh;

    display:flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.5);

    p{
        padding: 50px;
        background:white;
    }
    
}

</style>
