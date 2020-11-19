<template>
  <div class="gameboard" :style="params">
    <v-case 
      v-for="i in max" 
      :key="gameboardLoaded ? ownerKey(i) : i" :idCase="'case-' + i" 
      :owner="owners['case-' + i]"
      @moveHere="clickOncase"
    ></v-case>

    <div class="pawn" 
      v-for="user of getUsers" 
      :key="user" 
      :style="pawnStyle" 
      :class="user ==  $store.state.playerTurn ? user == $store.state.me && !$store.state.move ? 'active me' : 'active' : ''" 
      :id="user" 
      @click="wantToPlay(user)"
    ><p class="pawnName">{{user}}</p></div>
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
    props:{
      autoMove:{
        type: Boolean,
        required: false
      }
    },
    data(){
      return{
        maxCases: 20,
        sizeCase: 30,
        max: 400,
        pawns: [],
        highlights: [],
        territories:{},
        gameboardLoaded:false,
        owners: [],
        auto: false
      }
    },
    computed:{
      ...mapGetters(['getUsers', 'getMove', 'getPlayerTurn', 'getCountDownFakeMoves']),
      whoPlays(){
        return this.getPlayerTurn
      },
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
        switchTurn: 'switchTurn',
        toggleMove: 'toggleMove'
      }),
      ownerKey(i){
        return `${this.owners[i]}-${i}` ;
      },
      caseOwner(caseId){
        if(this.territories[this.$store.state.playerTurn]){
          let owner = Object.keys(this.territories).find(owner => this.territories[owner].includes(caseId)); 
          if(owner) {
            if(this.owners[caseId] != owner){
              // console.log("aaaah ?", owner, caseId)
            }
            this.owners[caseId] = owner;
            // console.log('ohoh ?', this.owners[caseId], caseId)
          }
        }
      },
      clickOncase(id){
        this.owners.splice(id, 1, this.$store.state.playerTurn)
        this.moveToCase(id);
      },
      moveToCase(targetId){
        console.log('///////////////////// new move ///////////////////////')
        const targetCase = Array.from(this.$children).find( child => child.$el.id == targetId);
        const targetPawn = this.pawns.find(pawn => pawn.id == this.$store.state.playerTurn);
        // console.log(this.$store.state.playerTurn, this.$store.state.players[targetPawn.id].pawnPos, target.$el.id)
        this.placePawn(targetPawn, targetCase);
        this.setPlayerPos({user:targetPawn.id, pos: targetId});
        targetCase.changeOwner(this.$store.state.playerTurn);

        if(this.auto){
          this.movePawn('auto');
          this.automaticMoves();

        } else {
          this.movePawn();
        }

      },
      automaticMoves(fakeTeam){
        let changeTurn = Math.random() > .5 ? true : false;

        if(!fakeTeam){
          if(changeTurn || this.$store.state.countDownFakeMoves <= 0 && this.$store.state.currentStack > 0){
            this.switchTurn('loose');
            this.$emit('changeTurn')
            // console.log('auto change turn', this.$store.state.playerTurn, this.$store.state.countDownFakeMoves)

            if(this.$store.state.playerTurn == this.$store.state.me){
              this.auto = false;
              if(this.$store.state.move){
                this.toggleMove();
              }
            }
          }
        }

        const updateTargetPawn = this.pawns.find(pawn => pawn.id == this.$store.state.playerTurn);
        let rand = Math.random() < .25 ?
                -1 :
                Math.random() > .25 && Math.random() > .5 ?
                1 : 
                Math.random() > .5 && Math.random() > .75 ?
                -20 :
                20;
        let i = parseInt(this.$store.state.players[updateTargetPawn.id].pawnPos.split('-')[1]) + rand;
        console.log('###################"')
        console.log('i:', i)
        if( i < 0) i == 20;
        else if(i > this.max * this.max ) i =  (this.max * this.max) - 1 
        else if (Number.isInteger(i/20)) i --;//right board
        else if (Number.isInteger((i -1)/20))i ++; //left board
        console.log('i:', i)
        console.log('###################"')

        if(this.auto){
          if(changeTurn){
            setTimeout(() => {
              this.moveToCase('case-' + i); // TODO: should be sync to autoMove
            },3000)
          } else {
            setTimeout(() => {
              this.moveToCase('case-' + i);
            },1000)
          }
        } else if (fakeTeam){
          setTimeout(() => {
            this.moveToCase('case-' + i);
            console.log('fake team !')
            setTimeout(() => {
              console.log('ok cest cool')
              this.$router.push('/quizz');
            }, 2000)
          }, 3000)
        }
         
      },
      displayTerritories(){
        for (let player in this.$store.state.players){
          for (let square of this.$store.state.players[player].cases){
              let target = Array.from(this.$children).find(child => child.$el.id == square);
              this.caseOwner(target.$el.id)

              if(this.territories[player]){
                this.territories[player].push(target.$el.id);
              } else {
                this.territories[player] = [target.$el.id];
              }

              if(target.owner){
                // console.log(target.owner)
              }
            }
        }
        for (let owner in this.territories){
          // let territory = this.territories[owner].sort((a,b) => a - b)  
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
      wantToPlay(user){
        if(!this.auto && !this.$store.state.move) this.$router.push('/quizz')
      },
    },
    created(){
      if(this.$store.state.playerTurn != this.$store.state.me){
        this.auto = true;
      }
    },
    mounted(){
      this.genereate();
      this.gameboardLoaded = true;
      this.displayTerritories();

      if(this.auto){
        setTimeout(() => this.automaticMoves(), 3000) // TODO : should be sync to automove 
      }

      if( 
        this.$store.state.move && 
        this.$store.state.playerTurn == this.$store.state.me && 
        this.$store.state.teamMateTurn != this.$store.state.teammates.length - 1){
          this.automaticMoves(true);
        }
    },
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

      .pawnName{
        display:none;
      }

      &:hover .pawnName{
          display:block;
          left:30px;
          color:white;
          font-weight:700;
          white-space: nowrap;
      }

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