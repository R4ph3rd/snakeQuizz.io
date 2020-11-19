<template>
  <div class="home">

    <stack class="stack"></stack>

    <game-board class="game" :autoMove="timeDown" @changeTurn="displayNewAlert()"></game-board>

    <section class="team" :style="'--color:' + color ">
      <div>
        <p>Team</p>
        <h2>{{$store.state.users[$store.state.users.length -1]}} team</h2>
      </div>
    </section> 

    <p v-if="$store.state.move"></p>

    <div class="alert" v-show="timeDown"> 
        <div>
          <p ><strong :style="teamColor">Team {{$store.state.playerTurn}}</strong>  ist am Zug!</p>
          <p class="teammove" v-if="$store.state.move && $store.state.playerTurn == $store.state.me">{{$store.state.teammates[$store.state.teamMateTurn]}} ist am Zug!</p>
          <v-buton @click.native="timeDown = !timeDown"></v-buton>
        </div>
    </div>

    <div class="alert" v-if="gameEnded"> 
        <div>
          <p>Das Spiel ist beendet! </p>
          <p class="winTeam">Das Team <strong :style="teamColor">{{winningTeam}}</strong> hat mit  einer Anzahl von {{$store.state.players[winningTeam].cases.length}} Feldern gewonnen!</p>
          <v-buton @click.native="gameEnded = !gameEnded"></v-buton>
        </div>
    </div>
  </div>
</template>

<script>
import stack from '../components/atoms/stack'
import game from '../components/cells/game'
import buton from '../components/atoms/button'

export default {
  name: 'Home',
  components: {
    'stack': stack,
    'game-board': game,
    'v-buton': buton
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
    },
    gameEnded(){
      return this.$store.state.currentStack == 0;
    },
    winningTeam(){
      let territories =  Object.keys(this.$store.state.players).map(player => this.$store.state.players[player].cases)
      let biggest = territories.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []); 
      return Object.keys(this.$store.state.players).find(player => {
        return this.$store.state.players[player].cases === biggest;
      })
    },
    teamColor(){
      return 'color:' + this.$store.state.players[this.$store.state.playerTurn].color
    }
  },
  methods: {
    displayNewAlert(){
      console.log('new alert', this.$store.state.playerTurn)
      this.timeDown = true ;
      setTimeout(() => this.timeDown = false, 3000)
    }
  },
  mounted(){
    this.color = this.$store.state.players[this.$store.state.me].color;
    setTimeout(() => this.timeDown = false, 3000)
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

    div{
        padding: 50px;
        background:white;

        p:nth-child(2){
          margin-top:20px;
        }
    }
    
}

</style>
