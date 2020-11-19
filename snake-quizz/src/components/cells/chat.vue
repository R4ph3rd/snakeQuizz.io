<template>
  <section class="chat">
      <h2>Chat</h2>
      <ul>
          <li v-for="(msg, i) in getMessages" :style="'--color:' + msg.color" :key="msg.content + i"><p v-html="msg.content"></p></li>
      </ul>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'Chat',
    computed:{
        ...mapGetters(['getMessages'])
    }
}
</script>

<style scoped lang="scss">
.chat{
  width:100%;
  height:100vh;
  background:$gray05;
  padding: 30px;
  padding-bottom:50px;
  max-width:100vh;
}

ul {
    width:100%;
    height:100%;
    max-height:100%;
    overflow-y: auto;
    max-width:100%;

    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    list-style: none;
}

li{
    width:100%;
    height:max-content;
    padding:20px;
    padding-left:30px;
    margin-bottom:20px;
    color:white;
    background: $gray04;    
    text-align:left;

    &::before{
        content: ' ';
        position:absolute;
        width:10px;
        height:100%;
        top:0;
        left:0;
        background: var(--color);
        opacity: .5;
    }

    p >>> strong {
        color: var(--color);
    }
}

</style>