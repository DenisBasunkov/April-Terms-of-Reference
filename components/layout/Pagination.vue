<script lang="ts" setup>
    const CompanyLists = useCompanyStore()
    const CompanyLength = CompanyLists.CompanyList.length;
    const widthScreen = ref<number>(window.screen.width)
    const PageCount = ref<number>(Math.ceil(CompanyLists.PageCount))
    const coutePerPage = ref<Number>(CompanyLists.postPerPage)
    // const currentPage = ref<number>(CompanyLists.currentPage)
        const updateWidth = () => {
        widthScreen.value = window.innerWidth;
        if(widthScreen.value>=800){
        CompanyLists.setDecreasePostPerPage(8)
        }
    };
    onMounted(()=>{
        if(PageCount.value == 1){
            Pagination_CurrentPage(1)
        }
        window.addEventListener('resize', updateWidth);
        updateWidth()
    })

    onUnmounted(()=>{
        if(PageCount.value == 1){
            Pagination_CurrentPage(1)
        }
        window.removeEventListener('resize', updateWidth);
    })


    
    const Pagination_CurrentPage = (CurrentPage:number)=>{
        CompanyLists.setCurrentPage(CurrentPage);
        window.scrollTo(document.body.scrollHeight, 0);
    }
    const setcoutePerPage=()=>{
        CompanyLists.setIncreasePostPerPage(Number(coutePerPage.value))
        PageCount.value = Math.ceil(CompanyLists.PageCount)
        if(CompanyLists.currentPage > PageCount.value){
            Pagination_CurrentPage(PageCount.value);
        }
        Pagination_CurrentPage(CompanyLists.currentPage);
    }
// const setPerPageList=(PerPage:number)=>{
//     coutePerPage.value = PerPage
// }

</script>

<template>
    {{ PageCount }}
    <div v-if="widthScreen >= 800"  class="Pagination_container_fill">
        <div>
            <label for="">Кол-во карточек: </label>
            <select class="select_PerPage" name="PerPage" v-model="coutePerPage" @change="setcoutePerPage">
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
            </select>
        </div>
            <button v-bind:disabled="CompanyLists.currentPage==1" @click="Pagination_CurrentPage(1)" class="Pagination_button"><Icon name="streamline:interface-arrows-button-left-double-arrow-arrows-double-left"/></button>
            <button  v-bind:disabled="CompanyLists.currentPage==1" @click="Pagination_CurrentPage(--CompanyLists.currentPage)" class="Pagination_button"><Icon name="streamline:interface-arrows-button-left-arrow-keyboard-left"/></button>
            <button :key="i" class="Pagination_button" :class="CompanyLists.currentPage == i?'active':''" v-for="i in Math.ceil(CompanyLists.PageCount)" @click="Pagination_CurrentPage(i)">{{ i }}</button>
            <button v-bind:disabled="CompanyLists.currentPage==PageCount" @click="Pagination_CurrentPage(++CompanyLists.currentPage)" class="Pagination_button"><Icon name="streamline:interface-arrows-button-right-arrow-right-keyboard"/></button>
            <button v-bind:disabled="CompanyLists.currentPage==PageCount" @click="Pagination_CurrentPage(PageCount)" class="Pagination_button"><Icon name="streamline:interface-arrows-button-right-duoble-arrow-arrows-double-right"/></button>
    </div>
   <!-- v-if="widthScreen >= 600" -->
    <div v-else class="Pagination_container">
        <!-- <label for="">{{ CompanyLists.postPerPage }} из {{CompanyLength }}</label> -->
        <div>
            <button @click="CompanyLists.setIncreasePostPerPage(CompanyLists.postPerPage+8)" v-show="CompanyLists.postPerPage<=CompanyLength">Показать ещё</button>
            <button @click="CompanyLists.setDecreasePostPerPage(CompanyLists.postPerPage-8)" v-show="CompanyLists.postPerPage>8">Назад</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.Pagination_container_fill{
    width: 100%;
    text-align: center;
    padding: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 25px;  
}

.Pagination_container{
    width: 100%;
    text-align: center;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    gap: 15px;

    & div{
        display: flex;
        flex-direction: row;
        align-content: center;
        gap: 25px;
    }
    & label{
        font-size: 25px;
    }
    & button{
        border: $buttonBorder;
        background-color: transparent;
        padding: $inputPadding;
        border-radius: 15px;
        font-size: $buttonFontSize;
        font-weight: 600;
    }
}

.select_PerPage{
    border: 2px solid $Color176B87;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 600;
}

.Pagination_button{
    width: 35px;
    height: 35px;
    outline:$buttonBorder;
    border: none;
    outline-offset: 0;
    background-color: transparent;
    border-radius: 15px;
    transition: all .5s ;
    transform: scale(1) ;
    font-weight: 800;
}

.active{
    background-color: $Color13556b;
    outline-offset: 5px;
    color: $ColorEEF5FF;
    transform: scale(1.2) ;
}

</style>
