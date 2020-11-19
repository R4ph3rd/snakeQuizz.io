import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myTeam = 'SmartSnakes';

export default new Vuex.Store({
  state: {
    me: myTeam,
    users: ['Die Superhelden', 'Die fantastischen Fünf', 'Die Gangster', 'Die Kappos', myTeam], // TODO : teammates names 
    teammates: ['Rose Sth', 'Mark', 'Hannah Fbg', 'Anna Sf', 'Oliver'],
    teamMateTurn: 4,
    playerTurn: myTeam,
    move: false,
    currentStack: 20,
    totalStack: 30,
    colors : ['#555E7B', '#B7D968', '#FDE47F', '#B576AD', '#E04644'],
    players: {},
    messages: [],
    countDownFakeMoves: 3,
    questions: {
      "Was ist die Hauptstadt von Deutschland?" : {
        rep: ["München", 'Köln', 'Berlin', 'Munich', 'Hamburg'],
        answer : 2
      },
      "Der Mond besteht aus..." : {
        rep: ["Käse", 'Gestein', 'Kuchen', 'alles falsch! Das ist der Mannemond'],
        answer : 1
      },
      "In welchem Monat feiern die meisten Menschen Neujahr?" : {
        rep: ["Dezember", 'Februar', 'Januar', 'November'],
        answer : 2
      },
      "Welche Farbe entsteht, wenn man Rot und Gelb mischt?" : {
        rep: ['Rosa', 'Lila', 'Grau', "Orange",],
        answer : 3
      },
      "Wer verkündet das Urteil im Gericht?" : {
        rep: ['Loose', 'Loose', 'loose', "Loose",],
        answer : -1
      },
      "Wer verkündet das Urteil im Gericht?" : {
        rep: ['Richter', 'Staatsanwalt', 'Bürgermeister', 'Angeklagter',],
        answer : 0
      },
      "Wie heißt der kleinste Vogel?" : {
        rep: ["Spatz", "Rabe", 'Kolibri', "Hummel"],
        answer : 2
      },
      "Welches ist der längste Fluss der Welt?":{
        rep: ["Lech", "Nil", "Wertach", "Mekong"],
        answer: 1
      },
      "Wie heißen die ursprünglichen Bewohner Australiens?":{
        rep: ["Indianer", "Australian Natives", "Koalas", "Aborigines"],
        answer: 3
      },
      "Die Europa-Hymne ist":{
        rep: ["Mozarts Zauberflöte", "Beethovens 9. Sinfonie", "Schuberts Forellenquintett", "Verdis La Traviata",],
        answer: 1
      },
      "Der karthargische Feldherr Hannibal zog im Zweiten Punischen Krieg wegen eines Kriegs mit seiner Truppe über die Alpen. Welche ungewöhnlichen Tiere begleiteten ihn damals?":{
        rep:["Elefanten", "Zecken", "Giraffen","Fledermäuse"],
        answer: 0
      }
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
    decreaseQuestionsStack(state, payload){
      state.currentStack --;
    },
    movePawn(state, payload){
      if(state.move){
        if(payload){
          if(payload.fake){
            state.countDownFakeMoves --;
          }
        }
        if(state.playerTurn == state.me){
          console.log('team turn : ', state.teamMateTurn, state.teammates[state.teamMateTurn])
            if(state.teamMateTurn >= state.teammates.length - 1){
              state.teamMateTurn = 0;
            } else {
              state.teamMateTurn ++;
            }
            console.log('team turn : ', state.teamMateTurn, state.teammates[state.teamMateTurn])
        }
      } 
    },
    switchTurn(state, payload){
      if(state.countDownFakeMoves <= 0 || payload == 'loose'){
        let i = state.users.findIndex(player => player == state.playerTurn) + 1;  
        i = i >= state.users.length ? 0 : i;
        state.playerTurn = state.users[i];

        state.countDownFakeMoves = 2 + Math.floor(Math.random() * 7)
        console.log('switch turn', state.playerTurn, state.countDownFakeMoves)
        state.messages.push({
          content: `Das Team <strong>${state.playerTurn}</strong> ist nun an der Reihe!`,
          color: state.players[state.playerTurn].color
        })
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

        state.messages.push({
          content: `Das Team <strong>${user}</strong> ist nun an der Reihe!`,
          color: state.players[user].color
        })
      }
      for (let user of state.users){
        state.messages.push({
          content: `Das Team <strong>${user}</strong> ist nun an der Reihe!`,
          color: state.players[user].color
        })
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
    },
    sendMessage(state, payload){
      state.messages.push(payload);
    }
  },
  actions: {
    setup(context){
      context.commit('setup')
    },
    decreaseQuestionsStack(context ,payload){
      context.commit('decreaseQuestionsStack');
    },
    setPlayerPos(context, payload){
      context.commit('setPlayerPos', payload)
    },
    winCase(context, payload){
      context.commit('winCase', payload)
    },
    movePawn(context, payload){
      if (payload == 'auto'){
          context.commit('movePawn', {fake: true});
          context.commit('toggleMove');
          // context.commit('switchTurn');
      } else {
        context.commit('movePawn');
        context.commit('toggleMove');
      }
    },
    generateStartCases(context, payload){
      context.commit('generateStartCases', payload)
    },
    switchTurn(context, payload){
      context.commit('switchTurn', payload);
    },
    toggleMove(context){
      context.commit('toggleMove')
    },
    sendMessage(context, payload){
      context.commit('sendMessage', payload)
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
    },
    getTeammates(state){
      return state.teammates;
    },
    getMessages(state){
      return state.messages;
    }
    
  }
})
