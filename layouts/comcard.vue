<script setup lang="ts">

const router = useRouter();
const route = useRoute();
</script>

<template>
<main >
   <header class="page_header">
    <button class="button back_btn" @click="router.push('/')"><Icon name="material-symbols:arrow-back-ios"/>Назад</button>
    <h1>Company Page</h1>
   </header>
    <slot ></slot>
</main>
</template>

<style scoped lang="scss">

.page_header{

    display: grid;
    grid-template-columns: 80px 5fr;
    gap: 25px;
    align-items: center;

}

.back_btn{
border-radius: 25px;
    align-items: center;
    justify-content: flex-start;
    display: flex;

}

</style>