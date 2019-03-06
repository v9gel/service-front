<template>
    <el-menu class="el-menu" mode="horizontal" :router="true">
        <el-menu-item index="4" :route="{name:'home'}">
            Сервисная фирма.АРМ Точка
        </el-menu-item>
        <el-submenu index="4" style="float: right;">
            <template slot="title"><i class="el-icon-menu"></i> Точка Малахова</template>
            <el-menu-item index="4-1"><i class="el-icon-setting"></i> Settings</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-information"></i> About</el-menu-item>
            <el-menu-item index="4-3"><i class="el-icon-circle-close"></i> Logout</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .el-menu--horizontal .el-submenu > .el-menu {
        left: initial !important;
        right: 0;
    }

</style>