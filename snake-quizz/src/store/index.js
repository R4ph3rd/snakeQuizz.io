import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: 'Rabbit',
    users: ['Oliver Twist', 'Charles Dickens', 'Michel Foucault', 'Jimi Henderson', 'Rabbit'],
    playerTurn: 'Rabbit',
    move: false,
    currentStack: 30,
    totalStack: 30,
    colors : ['#555E7B', '#B7D968', '#FDE47F', '#B576AD', '#E04644'],
    players: {},
    countDownFakeMoves: 2,
  },
  mutations: {
    toggleMove(state, payload){
      state.move = !state.move;
    },
    movePawn(state){
      if(state.move){
        state.currentStack --;
        state.countDownFakeMoves --;
      } 
    },
    switchTurn(state){
      if(state.countDownFakeMoves <= 0){
        let i = state.users.findIndex(player => player == state.playerTurn) + 1;
        i = i >= state.users.length ? 0 : i;
        state.playerTurn = state.users[i];

        state.countDownFakeMoves = Math.floor(Math.random() * 5)
      }
    },
    setup(state){
      for (let user of state.users){
        state.players[user] = {
          pawnPos : null,
          color: state.colors.shift(),
          cases: []
        };
      }
    },
    setPlayerPos(state, payload){
      state.players[payload.user].pawnPos = payload.pos;
    },
    winCase(state, payload){
      if(payload.square){
        state.players[payload.user].cases.push(payload.square);

        // console.log(state.players[payload.user].cases)

        for (let player in state.players){
          if (player != payload.user && state.players[player].cases.includes(payload.square)){
            state.players[player].cases.splice(
              state.players[player].cases.findIndex( c => c == payload.square),
              1
            )
          }
        }
      }
    },
    generateStartCases(state, payload){
      let iCase = parseInt(state.players[payload.user].pawnPos.split('-')[1]);

      if(payload.user == state.users[0]){
        for (let x = iCase - 6; x < iCase + 4; x ++){
          state.players[payload.user].cases.push('case-' + (x - 20))
          state.players[payload.user].cases.push('case-' + (x))
          state.players[payload.user].cases.push('case-' + (x + 20))
        }

      } else if (payload.user == state.users[1]){
        for (let x = iCase - (4 * 20) - 6; x < iCase - (4 * 20); x ++){
          state.players[payload.user].cases.push('case-' + x)
          
          if(x + (20 * 3  ) < iCase - 22){
            state.players[payload.user].cases.push('case-' + (x + (20 * 3)))
          }
        }
        for (let y = iCase - (4 * 20); y < iCase; y += 20){
          state.players[payload.user].cases.push('case-' + (y - 6))
          state.players[payload.user].cases.push('case-' + y)
        }

      } else if (payload.user == state.users[2]){
        for (let x = iCase; x < iCase + 8; x ++){
          state.players[payload.user].cases.push('case-' + (x - 20))
          state.players[payload.user].cases.push('case-' + (x))
          state.players[payload.user].cases.push('case-' + (x + 20))
          
          if(x > iCase + 4){
            for (let y = x + 20 ; y < x + (20 * 5) ; y += 20){
              state.players[payload.user].cases.push('case-' + y)
            }
          }
        }

      } else if (payload.user == state.users[3]){
        for (let x = iCase; x < iCase + 7; x ++){
          state.players[payload.user].cases.push('case-' + (x))

          for (let y = x + 20 ; y < x + (20 * 8) ; y += 20){
            state.players[payload.user].cases.push('case-' + y)
          }
        }

      } else if (payload.user == state.me){
        for (let x = iCase - 6; x < iCase + 3; x ++){
          state.players[payload.user].cases.push('case-' + (x))

          if(x < iCase){
            state.players[payload.user].cases.push('case-' + (x - 20))
          }

          for (let y = x + 20 ; y < x + (20 * 5) ; y += 20){
            state.players[payload.user].cases.push('case-' + y)
          }
          
        }
      
      } else {
        for (let x = 0; x < (Math.random() * 5 * 5) + 20; x ++){
          state.players[payload.user].cases.push('case-' + (iCase + x))
        }
      }
    }
  },
  actions: {
    setup(context){
      context.commit('setup')
    },
    setPlayerPos(context, payload){
      context.commit('setPlayerPos', payload)
    },
    winCase(context, payload){
      context.commit('winCase', payload)
    },
    movePawn(context, payload){
      context.commit('movePawn', payload);
      context.commit('toggleMove');
      context.commit('switchTurn');
    },
    generateStartCases(context, payload){
      context.commit('generateStartCases', payload)
    },
    switchTurn(context){
      context.commit('switchTurn')
    },
    toggleMove(context){
      context.commit('toggleMove')
    }
    
  },
  getters: {
    getMove(state){
      return state.move;
    },
    getPlayerTurn(state){
      return state.playerTurn
    },
    getUsers(state){
      return state.users;
    },
    getPlayers(state){
      return state.players;
    },
    getCountDownFakeMoves(state){
      return state.countDownFakeMoves
    }
  }
})
