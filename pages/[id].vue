<script setup lang="ts">
interface User {
    id: number,
    companyName: string,
    Date: Date,
    Color: string,
    Job: string,
    Avatar: string,
}
definePageMeta({
    layout:'comcard'
})
const route = useRoute();
useHead({
    title:"My d"+route.params.id
})
const CompanyPage = useCompanyStore()
const data = ref<User>({
    id: 0,
    companyName: '',
    Date: new Date(),
    Color: '',
    Job: '',
    Avatar: '',
});
const isLoader = ref<Boolean>(true)
onMounted(()=>{
    isLoader.value = true
    setTimeout(async() => {
        data.value = CompanyPage.CompanyPage as User
        if(Object.keys(data.value).length==0){
            data.value = JSON.parse(sessionStorage.getItem('Page_viewed') as string) as User
            
        }
        isLoader.value=false;
    }, 500);
})
</script>

<template>
    <div style="width: 100%; height: 100vh;">

        <div v-if="isLoader" class="loader">
            <Icon name="svg-spinners:blocks-shuffle-3" size="150" color="white"/>
        </div>
        
        <div class="info_container" v-else>
            <img :src="data.Avatar" width="350" :alt="data.Avatar">
            <div class="info">
                <h1>Название: {{data.companyName }}</h1>
                <div>
                    <p>Работа: {{data.Job }}</p>
                    <p>Цвет: {{data.Color }}</p>
                </div>
                <code>{{new Date(data.Date).toDateString() }}</code>
            </div>
            <!-- {{data}} -->
            <!-- {{ CompanyPage.WatchedCompanyPage }} -->
        </div>
    </div>
</template>

<style lang="scss" scoped>

*{
    border: 1px solid transparent;
}

.loader{
    
    height: 100%;
    background-color: $shadow03;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info_container{
    padding-top: 80px;
    height: 100%;
    display: grid;
    grid-template-columns: 550px 350px;
    grid-auto-rows: 400px;
    grid-auto-flow:column;
    & img{
        width: 100%;
        height: 100%;
    }
}

.info{
    display: grid;
    grid-template-rows: 60px 30px 15px;
    gap: 15px;
}
</style>