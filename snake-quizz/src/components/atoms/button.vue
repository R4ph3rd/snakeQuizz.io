
<template>
  <button >Nächster</button>
</template>

<script>
export default {
    name: 'buton',
}
</script>

<style scoped lang="scss">
button{
    border:none;
    padding:10px;
    background: $gray02;
    color:white;
    margin-top:20px;

    &:hover{
        cursor:pointer;
    }
}

</style>