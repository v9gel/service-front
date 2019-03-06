<template>
    <div>
        <div class="ll"></div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Форма входа</span>
                    </div>
                    <div class="text item">
                        <div style="margin: 20px;"></div>
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="Шифр подразделения">
                                <el-input v-model="formLabelAlign.name" placeholder="Введите шифр"></el-input>
                            </el-form-item>
                            <el-form-item label="Пароль">
                                <el-input v-model="formLabelAlign.region" placeholder="******"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('dynamicValidateForm')">Войти</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            };
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    .ll {
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../assets/bg.jpg");
        background-size: cover;
    }

    .row-bg{
        margin-top: 60px;
    }
</style>