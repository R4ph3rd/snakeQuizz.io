<template>
  <div id="app" :style="usersPics()">
    <section>
      <router-view id="table"/>

      <grid> 
            <user-cam 
              v-for="(user, i) in getUsers" 
              :key="user" 
              :username="user" 
              :me="user == $store.state.me"
              :height="user == $store.state.me ? camSize/1.5 : camSize"
              :width="user == $store.state.me ? camSize/1.5 : camSize"
              :pic="user == $store.state.me ? '' : pics[i]">
            </user-cam>
        </grid> 
    </section>
    <section class="chat"></section>
  </div>
</template>

<script>
import userCam from './components/atoms/userCam'
import grid from './components/molecules/grid'
import {mapActions, mapGetters} from 'vuex';

export default {
  name:'App',
  components: {
    'user-cam': userCam,
    'grid': grid
  },
  data(){
    return {
      appWidth: undefined,
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
    }
  },
  computed:{
    ...mapGetters(['getUsers']),
    camSize(){
      return (this.appWidth - 60 - (this.getUsers.length * 20))/(this.getUsers.length)
    }
  },
  methods:{
    ...mapActions({
      setup: 'setup'
    }),
    usersPics () {
      let vue = this;
      /* return fetch('https://uifaces.co/api?limit=' + this.getUsers.length, {
        method: 'GET',
        headers: {
          'X-API-KEY': 'FF73BB56-12F34A59-972424FA-7976C8B7',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }).then( async rep => {
        const json = await rep.json();

        return vue.getUsers.map( user => {
          return `--${user}:${json.shift().photo}`
        }).join(' ; ')
      })  */     
    }
  },
  created(){
    this.setup();
  },
  mounted(){
    // console.log(this.usersPics())
    this.appWidth = this.$el.children[0].clientWidth
  }
  
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin:0;
  padding:0;
  position:relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display:grid;
  grid-template-columns: 75% auto;
  min-height:100vh;
  min-width: 100vw;
}



.chat{
  width:100%;
  height:100%;
  background:$gray05;
}

.grid{
    align-items:end;
    justify-items: start;
    justify-content: center;
    margin-left:30px;
    margin-right:30px;
  }

#table{
  padding:30px;
  height: calc(100% - 200px)
}
</style>
