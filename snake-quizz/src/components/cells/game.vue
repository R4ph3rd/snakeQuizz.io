<template>
  <div class="gameboard" :style="params">
    <v-case v-for="i in max" :key="i" :id="'case-' + i"></v-case>

    <div class="pawn" v-for="user of getUsers" :key="user" :style="pawnStyle" :class="user ==  $store.state.playerTurn ? user == $store.state.me && !$store.state.move ? 'active me' : 'active' : ''" :id="user" @click="wantToPlay(user)"></div>

    <div v-for="(h,i) in highlights" class="hightlight-overlay" :key="upToMove ? 'highlight-' + i : 'hightlight-' + i + '-null'" @click="moveToCase(h.target)" :style="h.style"></div>
  </div>
</template>

<script>
// import P5 from 'p5'
import {mapActions, mapGetters} from 'vuex';
import vcase from '../atoms/case'

export default {
    name: 'Gameboard',
    components:{
      'v-case': vcase
    },
    data(){
      return{
        maxCases: 20,
        sizeCase: 30,
        max: 400,
        pawns: [],
        highlights: [],
        upToMove: false
      }
    },
    computed:{
      ...mapGetters(['getUsers', 'getMove', 'getPlayerTurn']),
      params(){
        let params = '';
        params += `grid-template-columns: repeat(${this.maxCases}, ${this.sizeCase}px);`
        params += `grid-auto-rows: ${this.sizeCase}px;`
       
        return params;
      },
      pawnStyle(){
        let style = `
            width: ${this.sizeCase * 3 / 4}px;
            height: ${this.sizeCase * 3 / 4}px;
            border-radius: ${this.sizeCase}px;
        `;

        return style;
      },
    },
    methods:{
      ...mapActions({
        setPlayerPos : 'setPlayerPos',
        movePawn: 'movePawn',
        winCase: 'winCase',
        generateStartCases : 'generateStartCases',
        switchTurn: 'switchTurn'
      }),
      moveToCase(target){
        const targetPawn = this.pawns.find(pawn => pawn.id == this.$store.state.playerTurn);
        this.placePawn(targetPawn, target);
        this.setPlayerPos({user:targetPawn.id, pos: target.$el.id});

        // clear everything after move
        this.movePawn();
        this.upToMove = false;
        this.highlights = [];

        if(this.$store.state.playerTurn.trim() !== this.$store.state.me){
          let changeTurn = Math.random() > .5 ? true : false;

          if(changeTurn){
            this.switchTurn();
            console.log(this.$store.state.playerTurn)
            this.upToMove = false;
            this.highlights = [];
            this.$emit('changeTurn')
          }

          if(this.$store.state.playerTurn.trim() !== this.$store.state.me){
              const updateTargetPawn = this.pawns.find(pawn => pawn.id == this.$store.state.playerTurn);
              let rand = Math.random() < .25 ?
                      -1 :
                      Math.random() > .25 && Math.random() > .5 ?
                      1 : 
                      Math.random() > .5 && Math.random() > .75 ?
                      -20 :
                      20;
              let i = parseInt(this.$store.state.players[updateTargetPawn.id].pawnPos.split('-')[1]) + rand;
              if( i < 0) i == 20;
              else if(i > this.max * this.max ) i =  (this.max * this.max) - 1 
              else if (Number.isInteger(i/20)) i --;//right board
              else if (Number.isInteger((i -1)/20))i ++; //left board
              let targetCase = Array.from(this.$children).find( child => child.$el.id == 'case-' + i)
            
              setTimeout(() => {
                this.moveToCase(targetCase);
              },1000)
          }          
        }
      },
      displayTerritories(){
        for (let player in this.$store.state.players){
          for (let square of this.$store.state.players[player].cases){
              let target = Array.from(this.$children).find(child => child.$el.id == square);
              target.$el.style.background = this.$store.state.players[player].color;
            }
        }
      },
      genereate(){
        if(this.$store.state.players[this.$store.state.me].pawnPos == null){
          for (let u = 0; u < this.getUsers.length ; u ++){
            let user = this.getUsers[u];
            let undex = Math.floor((this.max / (this.getUsers.length + 2.5)) * (u + 1))
            this.setPlayerPos({user : user, pos: this.$el.children[undex].id})

            
            if(this.$store.state.players[user].cases.length <= 1){
              this.generateStartCases({user:user})
            }
            
          }
        }
        
        this.pawns = Array.from(this.$el.children).filter(child => Array.from(child.classList).includes('pawn'))

        for (let pawn of this.pawns){
          pawn.style.background = this.$store.state.players[pawn.id].color;
          let pawn_case = Array.from(this.$children).find(child => child.$el.id == this.$store.state.players[pawn.id].pawnPos);
          pawn_case.$el.style.background = this.$store.state.players[pawn.id].color;

          this.placePawn(pawn, pawn_case);
        }
      },
      placePawn(pawn, pawn_case){
        pawn.style.top = pawn_case.$el.offsetTop + (this.sizeCase/8) + 'px';
        pawn.style.left = pawn_case.$el.offsetLeft + (this.sizeCase/8) + 'px';

        this.winCase({user: pawn.id, square: pawn_case.$el.id})
        this.displayTerritories();
      },
      wantToPlay(user ){
        if(this.$store.state.playerTurn == this.$store.state.me && user == this.$store.state.me && !this.$store.state.move) this.$router.push('/quizz')
      },
      highlightCases(turn){
        let pawnCase = this.$store.state.players[turn].pawnPos.split('-')[1];
        const targets = Array.from(this.$children)
          .filter(child => {
            return [
              `case-${(parseInt(pawnCase)  + 1)}`,
              `case-${(parseInt(pawnCase)  - 1)}`,
              `case-${(parseInt(pawnCase)  + this.maxCases)}`,
              `case-${(parseInt(pawnCase)  - this.maxCases)}`
             ].includes(child.$el.id)
          })
        Array.from(targets).forEach(target => {
          if(Number.isInteger( (parseInt(target.$el.id.split('-')) - 1)/20 )){
            // nowrap
          } else {
            this.highlights.push({
              target: target,
              style :`
              width: ${this.sizeCase}px;
              height: ${this.sizeCase}px;
              background: ${this.$store.state.players[this.getPlayerTurn].color};
              opacity: .5;
              position:absolute;
              top: ${target.$el.offsetTop}px;
              left: ${target.$el.offsetLeft}px;
              z-index:10;
            `
            })
          }

        })
      }//|| pawnCase - 1 || pawnCase - 20 || pawnCase + 20
    },
    mounted(){
      this.genereate();
      this.displayTerritories();

      if(this.$store.state.move && this.$store.state.playerTurn == this.$store.state.me){
        this.highlightCases(this.$store.state.playerTurn)
        this.upToMove = !this.upToMove
      } else {
        // TODO : bloquer le tour de jeu pour les autres
      }   
    }
}
</script>

<style lang="scss">
.gameboard{
    margin:20px;
    padding:20px;
    background: $gray01;

    display:grid;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    max-width:712px;
    max-height:712px;


    .none{
      background: $gray06;
    }

    .pawn{
      position:absolute;
      border: 1px black solid;
      box-shadow: 0 0 8px rgba(0,0,0, .34);
      transition: .3s ease-out;

      &.active{
        border: 2px solid black;

        &.me:hover{
          cursor:pointer
        }
        
        &::after{
          content: ' ';
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          border-radius:80px;
          background:white;
          animation: .5s blink infinite alternate;
        }
      }

      @keyframes blink{
        from{
          opacity: 0
        }
        to {
          opacity: .5;
        }
      }
    }

    .hightlight-overlay{
      &:hover{
        cursor:pointer;
        opacity: 1;
        box-shadow: 0 0 8px 8px rgba(0,0,0, .64);
      }
    }
}
</style>