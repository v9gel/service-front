<template>
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :router="true">
        <el-submenu index="0">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>{{this.$localStorage.get('user').name}}</span>
            </template>
            <el-menu-item index='0-1' :route="{name: 'about'}">О подразделении</el-menu-item>
            <el-menu-item index='0-1' :route="{name: 'login'}">Выйти</el-menu-item>
        </el-submenu>
        <!--el-menu-item index='1' :route="{name:'home'}">
            <i class="el-icon-menu"></i>
            <span>Главная</span>
        </el-menu-item-->
        <el-menu-item index='2' v-if="this.$localStorage.get('user').activityId == 3" :route="{name:'orders'}">
            <i class="el-icon-document"></i>
            <span>Наряд-заказы</span>
        </el-menu-item>
        <el-menu-item index='2-1' v-if="this.$localStorage.get('user').activityId == 2" :route="{name:'ordersRepairs'}">
            <i class="el-icon-document"></i>
            <span>Наряд-заказы</span>
        </el-menu-item>
        <el-menu-item index='3' :route="{name:'invoice'}">
            <i class="el-icon-document"></i>
            <span>Накладные</span>
        </el-menu-item>
        <el-submenu index="4" :route="{name:'references'}">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>Справочники</span>
            </template>
            <el-menu-item index='4-1' :route="{name: 'clients'}">Клиенты</el-menu-item>
            <el-menu-item index='4-2' :route="{name: 'models'}">Модели</el-menu-item>
            <el-menu-item index='4-3' :route="{name: 'providers'}">Производители техники</el-menu-item>
            <el-menu-item index='4-4' :route="{name: 'views'}">Виды техники</el-menu-item>
            <el-menu-item index='4-5' :route="{name: 'packs'}">Упаковки</el-menu-item>
            <el-menu-item index='4-7' :route="{name: 'statuces'}">Статусы</el-menu-item>
            <el-menu-item index='4-8' :route="{name: 'services'}">Услуги</el-menu-item>
            <el-menu-item index='4-9' :route="{name: 'defects'}">Дефекты</el-menu-item>
            <el-menu-item index='4-10' :route="{name: 'subdivisions'}">Подразделения</el-menu-item>
            <el-menu-item index='4-11' :route="{name: 'activities'}">Виды деятельности</el-menu-item>
        </el-submenu>
        <el-menu-item index='5' :route="{name: 'help'}">
            <i class="el-icon-question"></i>
            <span>Помощь</span>
        </el-menu-item>
        <el-menu-item index='6' :route="{name:'about'}">
            <i class="el-icon-info"></i>
            <span>О программе</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>
    .el-menu {
        border-right: solid 0px #e6e6e6;
    }
    .el-menu-vertical-demo{
        min-height: 100%;
    }

    html, body {
        height: 100%;
        overflow: hidden;
    }


</style>