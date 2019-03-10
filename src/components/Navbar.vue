<template>
    <el-menu class="el-menu" mode="horizontal" :router="true">
        <el-menu-item index="n1" :route="{name:'home'}">
            Сервисная фирма.АРМ Точка
        </el-menu-item>
        <el-submenu index="n2" style="float: right;">
            <template slot="title"><i class="el-icon-menu"></i> Точка Малахова</template>
            <el-menu-item index="n2-1"><i class="el-icon-information"></i> О подразделении</el-menu-item>
            <el-menu-item index="n2-1" :route="{name: 'login'}"><i class="el-icon-circle-close"></i> Выйти</el-menu-item>
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