<script lang="ts" setup>
const router = useRouter()
    const props = defineProps({
        company:{
            type:Object,
            required:true,
            default:()=>{}
        },
        isTypeCard:Boolean,
    })
    const color = ref<String>(props.company.Color)
    const CompanyPage = useCompanyStore()
    const width = ref<number>(window.screen.width)
    onMounted(() => {
        window.addEventListener('resize', () => {
            width.value = window.innerWidth
        })
    })
    onUnmounted(() => {
        window.addEventListener('resize', () => {
            width.value = window.innerWidth
        })
    })
    const {setPage} = useCompany()

const RoutePage = async ()=>{
    sessionStorage.setItem('Page_viewed',JSON.stringify(props.company))
    setPage(props.company)
    router.push(`/${props.company.id}`)
}


</script>

<template>
<figure class="Card_container" :class="isTypeCard?'Card_block':width>700?'Card_list':'Card_block'"  >
    <img :src="company.Avatar" :alt="company.Avatar" @click="RoutePage">
    <figcaption :class="isTypeCard?'Card_info_container_block':'Card_info_container_list'">
        {{ company.id }}
        <h2 class="Card_title_name" @click="RoutePage">{{ company.companyName }}</h2>
        <div>
            <p>Цвет обводки: {{ company.Color }}</p>
            <p>Работа: {{ company.Job }}</p>
        </div>
        <p>{{new Date(company.Date).toDateString()}}</p>
    </figcaption>
</figure>    
</template>

<style scoped lang="scss">

.Card_container{
    // border: 2px solid red;
    border-radius: 25px;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 0 6px 0 $shadow03;
    transition: all .5s;

    &:hover{
        box-shadow: 0 0 16px 0 v-bind(color);
    }
    // & p{
    //     color: v-bind(color);
    // }

}

.Card_title_name{
    text-decoration: none;
    transition: all .5s;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
}

.Card_block{
width: 325px;
    display: grid;
    grid-template-rows: 250px auto;
    gap: 15px;
    
}

.Card_list{
    
    width:v-bind(width/2);
    display: grid;
    grid-template-columns: 250px 450px;
    gap: 15px;

}

.Card_info_container_block{
    padding: 5px 10px;
    display: grid;
    text-align: center;
    grid-template-rows:  auto auto 20px;
    gap: 15px;
   
}

.Card_info_container_list{
    padding: 15px 10px;
}

img{
        transition: all .5s;
        width: 100%;
        height: 100%;
    }
</style>