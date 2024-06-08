<script setup lang="ts">
    const isLoading = ref<Boolean>(true)
    const SearchText = ref<string>('')
    const {getCompanyAxios} = useCompany()
    const CompanyLists = useCompanyStore()

    const setSearch = ()=>{
        sessionStorage.setItem("searchText",JSON.stringify(SearchText.value))
        CompanyLists.currentPage = 1
        CompanyLists.setSearchCompany(SearchText.value)
    }
   
    const LoadingData = ()=>{
        isLoading.value = true
        setTimeout(async()=>{
            await getCompanyAxios()
            if(CompanyLists.CompanyList.length !==0){
                // CompanyLists.setSearchCompany(SearchText.value)
                isLoading.value = false
            }
        },1000)
    }

    onMounted(()=>{
        LoadingData()
        SearchText.value = JSON.parse(sessionStorage.getItem("searchText") as string)
        CompanyLists.setSearchCompany(SearchText.value)
    })

</script>

<template>
<main>
   <header class="header_nav">
    <button class="button reload_btn" @click="LoadingData"><Icon name="material-symbols:sync" /></button>
    <input type="text" v-model="SearchText" @keyup="setSearch" placeholder="Поиск">
    <a href="https://6661c94f63e6a0189feb9046.mockapi.io/listUser">API Данные</a>
   </header>
   <div style="height: 100vh; padding-top: 100px;" >
       <div v-if="isLoading" class="loading">
        <Icon name="svg-spinners:bars-fade" />
    </div>
    <slot v-else></slot>
</div>
</main>
</template>

<style scoped lang="scss" >

.header_nav{
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    gap: 25px;
    z-index: 100;
    & input{
        border:$inputBorder;
        padding: $inputPadding;
        border-radius: 15px;
        font-size: 20px;
    }
}

.reload_btn{
    width: 50px;
    text-align: center;
    font-size: 20px;
    &:hover{
        border-radius: 15px;
    }
}

.loading{
    background-color: rgba(black,.5);
    text-align: center;
    font-size: 50px;
    padding: 25px;
    color:$Color13556b;
width: 100%;
height: 100%;
}

a{

    text-align: center;
    text-decoration: none;
    padding: 5px;
    background-color: $ColorEEF5FF;
    box-shadow: 0 0 6px 0 $Color13556b,0 0 0 0 $Color13556b inset;
    transition: all .5s;
    font-size: 25px;
    border-radius: 15px;
    &:hover{
        box-shadow: 0 0 0px 0 $Color13556b,0 0 6px 0 $Color13556b inset;
    }
}

</style>