<template>
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :router="true"
            @open="handleOpen"
            @close="handleClose">
        <el-menu-item index="6" :route="{name:'home'}">
            <i class="el-icon-menu"></i>
            <span>Главная</span>
        </el-menu-item>
        <el-menu-item index="2" :route="{name:'orders'}">
            <i class="el-icon-document"></i>
            <span>Изделия</span>
        </el-menu-item>
        <el-submenu index="8" :route="{name:'references'}">
            <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>Справочники</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item one</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>
            <i class="el-icon-question"></i>
            <span>Помощь</span>
        </el-menu-item>
        <el-menu-item index="4" :route="{name:'about'}">
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
    .el-menu-vertical-demo{
        height: 100%;
    }
</style>