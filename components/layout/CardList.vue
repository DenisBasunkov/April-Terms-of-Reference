<script setup lang="ts">

const CompanyLists = useCompanyStore()



</script>

<template>
    {{ Math.ceil(CompanyLists.PageCount) }}
    <aside class="menu_filter">
        <div>
            <button title="Вертикальные карточки" 
            class="btn_type_list" 
            :class="CompanyLists.isList? 'btn_active':''"  
            @click="CompanyLists.setIsList(true)"
            ><Icon name="streamline:insert-top-left" /></button>
            
            <button 
            title="Горизонтальные карточки" 
            class="btn_type_list" 
            :class="CompanyLists.isList? '':'btn_active'"  
            @click="CompanyLists.setIsList(false)"
            ><Icon name="streamline:insert-side" /></button>
        </div>
    </aside>
    <div v-if="CompanyLists.WatchedCompanyList.length == 0" class="NotFounde_container">
        <h1>Нет данных по вышему запросу</h1>
    </div>
    <section v-else :class="CompanyLists.isList?'block_container':'list_container'">
        <LayoutCardCompany v-for="Company of CompanyLists.WatchedCompanyList" :key="Company.id" :company="Company" :is-TypeCard="CompanyLists.isList"/>
    </section>
    <div v-if="Math.ceil(CompanyLists.PageCount)>1">
        <LayoutPagination/>
    </div>
</template>

<style scoped lang="scss" >
    .NotFounde_container{
        width: 100%;
        height: 80vh;
        position: relative;
        & h1{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            font-size: 50px;
        }
    }

    .list_container{
        padding: 25px;
        gap: 25px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .block_container{
        padding: 25px;
        gap: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fit, 325px);
        grid-auto-columns: 350px;
        grid-auto-rows: 450px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .menu_filter{
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding: 15px 15px 5px;
    }

    .btn_type_list{
        color: $Color176B87;
        padding: 5px;
        font-size: 20px;
        background-color: $ColorEEF5FF;
        border-radius: 5px;
        border: 1px solid $Color176B87;
        margin: 0 2.5px;
        transition: all .5s;
        opacity: .6;
        transform: scale(1);
    }

    .btn_active{
        color: $Color86B6F6;
        border: 1px solid $Color86B6F6;
        opacity: 1;
        transform: scale(1.1);
        box-shadow: 0 0 6px 0 $Color13556b;
    }

</style>