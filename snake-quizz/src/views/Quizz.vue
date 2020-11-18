<template>
  <div>
      <div class="title">
          <h2>{{question}}</h2>
          <div class="timer">
              <p>{{countdown}}</p>
          </div>
      </div>

      <v-list :items="answers" @teamChoiceMade="teamAction"></v-list>

      <div class="alert" v-show="answer != ''">
          <div>
                <p>Rabbits, <br>your team choose <strong>{{answer}}</strong> with <strong>{{votes}}</strong> votes.</p>
                <p v-if="correctOrWrong" class="correct">Correct response !</p>
                <p v-else class="wrong">Wrong response !</p>
          </div>
      </div>
  </div>
</template>

<script>
import list from '../components/molecules/list';
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'Quizz',
    components:{
        'v-list': list
    },
    data(){
        return {
            answers: ['Blue', 'Rouge', 'Pink', 'Yellow', 'Cool', 'banana', 'oqudh spidg qydg pgyD PGSQPYDIGPGY'],
            answer : '',
            countdown: 33,
            choice: false,
            question: 'Lorem ipsum question',
            votes: 0,
            timer: () => {}
        }
    },
    computed:{
        ...mapGetters(['getPlayerTurn', 'getQuestions']),
        correctOrWrong(answer){
            let rep = this.getQuestions[this.question].rep[this.getQuestions[this.question].answer];
            return rep == this.answer;
        },
        teamHasChoosen(){
            console.log(this.$children[0])
        }
    },
    methods: {
        ...mapActions({
            toggleMove : 'toggleMove'
        }),
        teamAction(action){
            console.log(action)
            this.answer = action.value;
            this.votes = action.votes;

            this.choiceMade();
        },
        choiceMade(){
            setTimeout(() => {
                if(this.$store.state.playerTurn == this.$store.state.me) this.toggleMove();
                
                clearInterval(this.timer)
                // this.$router.push('/');
            }, 2000)
        }
    },
    mounted(){
        let questions = Object.keys(this.getQuestions);
        this.question = questions[Math.floor(Math.random() * questions.length)];
        this.answers = this.getQuestions[this.question].rep;

        this.timer = setInterval(() => {
            this.countdown -- ;
            if (this.countdown == 0){
                const choice = this.$children[0].usersSelected.reduce((acc, cur) => cur.length > acc.length ? cur : acc, []);
                const i = this.$children[0].usersSelected.findIndex( answer => answer == choice);
                this.answer = this.$children[0].$children[i];
                
                this.choiceMade();
            }
        }, 1000)
    }
}
</script>

<style scoped lang="scss">

h2{
    margin-top:50px;
    margin-bottom:100px;
}

ul{
    margin-left:auto;
    margin-right:auto;
    max-width:70%;
    max-height: 50vh;
}

.timer{
    position: absolute;
    top:-30px;
    
    width:80px;
    height:80px;
    border-radius:80px;
    display: flex;
    justify-content: center;
    align-items:center;
    background: $gray06;

    p{
        font-weight: 700;
        text-align:center;
        font-size:22px
    }
}

.alert{
    background:white;
    padding:50px;

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
        
        p{
            margin-bottom:30px;

            & + p {
                margin-bottom:0;
            }

            &.correct {
                color:rgb(91, 158, 91)
            }

            &.wrong{
                color: rgb(228, 131, 131)
            }
        }
    }
    
}

</style>