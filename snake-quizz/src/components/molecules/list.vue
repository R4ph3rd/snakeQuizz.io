<template>
  <ul>
      <list-item
      v-for="(item, i) in items"
      :key="item + i"
      :users="usersSelected[i]"
      @select="action"
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
    action(rep){
        let i = this.items.findIndex(item => item == rep);
        if (i != undefined){
            // console.log(this.usersSelected)
            const newval =  this.usersSelected[i] ? [this.$store.state.me].concat(this.usersSelected[i]) : [this.$store.state.me];
            this.usersSelected.splice(i, 1, newval);
        }

        let teamChoice = this.usersSelected.reduce((acc, cur, i) => {
                if (cur.length > acc.length && cur) return cur;
                else return acc;
            }, [])
        // teamChoice.push(this.tempUsers.shift())
        
        setTimeout( () => {
            let votes = 0;
            let value = this.items[this.usersSelected.findIndex( item => {
                if (item == teamChoice){
                    votes = item.length;
                    return true;
                } else {
                    return false;
                }
            })]
            this.$emit('teamChoiceMade', {value: value, votes: votes})
        }, 1500)
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