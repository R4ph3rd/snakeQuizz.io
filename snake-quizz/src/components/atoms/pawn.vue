<template>
  <div class="pawn" :style="pawn"></div>
</template>

<script>
export default {
    name: 'Pawn',
    props: {
        pawnStyle: {
            type: Object,
            required: true
        }
    },
    computed:{
        pawn(){
            return `
                background : ${this.pawnStyle.color};
                top: ${this.pawnStyle.top}px;
                left: ${this.pawnStyle.left}px;
                width: ${this.pawnStyle.size}px;
                height: ${this.pawnStyle.size}px;
                border-radius: ${this.pawnStyle.size * 4/3}px;
            `;
            
            
        }
    }
}
</script>

<style scoped lang="scss">
.pawn{
      position:absolute;
      border: 1px black solid;
      box-shadow: 0 0 8px rgba(0,0,0, .34);

      &:hover{
        cursor:pointer
      }
    }

</style>