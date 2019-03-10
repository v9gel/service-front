<template>
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :router="true"
            @open="handleOpen"
            @close="handleClose">
        <el-submenu index="0">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>Точка Малахова</span>
            </template>
            <el-menu-item index='0-1' :route="{name: 'about'}">О подразделении</el-menu-item>
            <el-menu-item index='0-1' :route="{name: 'login'}">Выйти</el-menu-item>
        </el-submenu>
        <el-menu-item index='1' :route="{name:'home'}">
            <i class="el-icon-menu"></i>
            <span>Главная</span>
        </el-menu-item>
        <el-menu-item index='2' :route="{name:'orders'}">
            <i class="el-icon-document"></i>
            <span>Заказы</span>
        </el-menu-item>
        <el-submenu index="3" :route="{name:'references'}">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>Справочники</span>
            </template>
            <el-menu-item index='3-1' :route="{name: 'clients'}">Клиенты</el-menu-item>
        </el-submenu>
        <el-menu-item index='4' :route="{name: 'help'}">
            <i class="el-icon-question"></i>
            <span>Помощь</span>
        </el-menu-item>
        <el-menu-item index='5' :route="{name:'about'}">
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