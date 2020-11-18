<template>
  <ul>
      <list-item
      v-for="(item, i) in items"
      :key="item"
      :users="usersSelected[i]"
      @select="action()"
      >{{item}}</list-item>
  </ul>
</template>

<script>
import listItem from '../atoms/listItem';
import {mapGetters} from 'vuex';

export default {
 name:"List",
 components:{
     'list-item': listItem
 },
 props:{
    items: {
        type: [Array, Object],
        required: true
    }
 },
 data(){
    return {
        tempUsers: [],
        usersSelected: []
    }
},
computed:{
    ...mapGetters(['getUsers']),
},
created(){
    this.tempUsers = this.getUsers.slice(0, this.getUsers.length);
    
    if(Array.isArray(this.items)){
        while( this.tempUsers.length > 1){
            let i = Math.floor(Math.random() * (this.items.length - 1));

            if(this.usersSelected[i]){
                this.usersSelected[i].push(this.tempUsers.shift())
            } else {
                this.usersSelected[i] = [this.tempUsers.shift()];
            }
        }
    }
},
methods:{
    action(){
        setTimeout( () => {
            let teamChoice = this.usersSelected.reduce((acc, cur, i) => {
                if (cur.length > acc.length) return cur;
                else return acc;
            }, [])

            teamChoice.push(this.tempUsers.shift())
            this.$emit('teamChoiceMade', this.items[this.usersSelected.findIndex( item => item == teamChoice)])
        }, 1000)
    }
}
}
</script>

<style scoped>
ul{
    width:100%;
    max-height: 100%;

    overflow-y: scroll;
}

</style>