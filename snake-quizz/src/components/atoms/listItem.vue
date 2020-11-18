<template>
  <li class="item" @click="select()">
      <input type="radio">

      <p><slot></slot></p>

      <span></span>

      <div class="users" v-if="users">
          <div v-for="user in users" :key="user" :class="user" class="bubble">
              <img :src="$store.state.players[user].avatar" alt="">
          </div>
      </div>
  </li>
</template>

<script>
export default {
    name:'ListItem',
    props:{
        users: {
            type: Array,
            required: false
        }
    },
    methods:{
        select(){
            this.$el.children[0].checked = true
            this.$emit('select', this.$slots.default[0].text)
        }
    },
    watch:{
        users: {
            handler(oldval, newval){
                // console.log(oldval, newval)
            },
            deep: true
        }
    }
}
</script>

<style scoped lang="scss">
    .item {
        width:100%;
        height:max-content;
        display: flex;
        // justify-content: space-between;
        align-items:center;

        padding: 20px 30px;
        margin-bottom:20px;
        background:$gray06;

        &:hover{
            cursor: pointer;
        }

        p{
            margin-left:30px;
        }

        span{
            flex-grow:2;
        }

        .users{
            display:flex;

            .bubble{
                width:30px;
                height:30px;
                border-radius:30px;
                overflow: hidden;
                background:$gray04;

                img{
                    object-fit: cover;
                    width:100%;
                    height:100%;
                }
            }
        }


    }
</style>