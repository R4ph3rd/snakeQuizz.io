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
    countDownFakeMoves: 1,
    questions: {
      "What is the capital of Germany ?" : {
        rep: ["Paris", 'Stuttgart', 'Berlin', 'Munich', 'Copenhagen'],
        answer : 2
      },
      "Who is the current chancellor of Germany ?" : {
        rep: ["Michel Barnier", 'Ursula Von Der Leyen', 'Jacques Chirac', 'Donald Trump', 'Angela Merkel'],
        answer : 4
      },
      "When was Germany reunified ?" : {
        rep: ["October, the  3st of 1990", 'October, the  2nd of 1989', 'October, the  8st of 1989', 'October, the  8th of 1990'],
        answer : 0
      },
      "How big is the german population" : {
        rep: ['Around 65 M', 'Around 90', 'Around 46', "Around 83 M",],
        answer : 3
      },
      "This is a question to make you loose." : {
        rep: ['Loose', 'Loose', 'loose', "Loose",],
        answer : -1
      },
    },
    pics: [
      'https://images.generated.photos/b1dgGoLm2dFYmqaN-uLj112fvre5lVUtPderLUV5IY0/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyMTA0OTkuanBn.jpg',
      'https://images.generated.photos/l5nduUDQB-jWt5Xvdn6b-acED0HcG3TzjSHxfJw_jwo/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA3MzQwODMuanBn.jpg',
      // 'https://images.generated.photos/LUqzUHD-ml86ec7--QHEeptsDA-vHjF3hIpkJqO1Nqc/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0MDk2MDlfMDY1/MjU2Ml8wNDY2MDI4/LmpwZw.jpg',
      'https://images.generated.photos/yDhM7XJt5Iey0y6Z0VOxABEgeE-vsueV7AxFWdDgT_I/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4NjQxOTAuanBn.jpg',
      'https://images.generated.photos/ZS6phEE3mijK3vaQWpuoiOKia_M6PBu8bMnWlfZ0waM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA2ODI3OThfMDg4/ODA5OF8wMTQzMjYx/LmpwZw.jpg',
      'https://images.generated.photos/LUqzUHD-ml86ec7--QHEeptsDA-vHjF3hIpkJqO1Nqc/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0MDk2MDlfMDY1/MjU2Ml8wNDY2MDI4/LmpwZw.jpg',
      'https://images.generated.photos/KGY6KlzU04mhfJ1qmeXShXugP4Cxvfzw6wK1vPfvGCg/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1NjY4NzRfMDk3/NzE4Ml8wNjcwMzk3/LmpwZw.jpg',
      'https://images.generated.photos/TDfwZyYZWAyQr7pQzpRY59ghDHphdCLEnaIHv991lmM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyOTE3NjlfMDk0/ODU5N18wNTc0NDA2/LmpwZw.jpg',
      'https://images.generated.photos/AwanoV7g_QkzWJKm7GQBs-z-CXfaFlgzOgxTvpLanDo/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA4MDcxMzUuanBn.jpg',
    ]
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
        console.log('switch turn', state.playerTurn)
      }
    },
    setup(state){
      for (let user of state.users){
        state.players[user] = {
          pawnPos : null,
          color: state.colors.shift(),
          cases: [],
          avatar: state.pics.shift()
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

      // CLEAN DOUBLONS
      let territories = Object.keys(state.players).map(player => state.players[player].cases)
      for (let territory of territories){
        let othersTerritories = territories.filter(ter => ter !== territory);
        let doublons = othersTerritories.flat().filter(square => territory.includes(square))
        let player = Object.keys(state.players).find(player => {
          return state.players[player].cases === territory;
        })

        doublons.forEach(doublon => {
          state.players[player].cases.splice(
            state.players[player].cases.findIndex(c => c == doublon),
            1
          )
        })
        
        
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
    },
    getQuestions(state){
      return state.questions
    }
  }
})
