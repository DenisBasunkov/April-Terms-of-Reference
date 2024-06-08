<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <RouterView/>
  </NuxtLayout>
</template>


<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header {
  position: fixed;
    background-color: $Color86B6F6;
    width: 100%;
    padding: 15px 25px;
    box-shadow: 0 6px 6px 0 $shadow03;
}

.button{
    border: $buttonBorder;
    text-align: center;
    padding: 5px 10px;
    transition: all .5s;
    transform: scale(1);
    color: $Color13556b;
    &:hover{
      transform: scale(1.05);
    }
}

footer{

  width: 100%;
  height: 25px;
  background-color: $Color176B87;
  padding: 25px;
}

</style>