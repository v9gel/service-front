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
                        <el-form label-position="top" :model="form">
                            <el-form-item label="Подразделение">
                                <el-select v-model="form.code" placeholder="Выберите подразделение">
                                    <el-option
                                            v-for="item in valueSubdivision"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Пароль">
                                <el-input placeholder="Введите пароль" v-model="form.password" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="login()">Войти</el-button>
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
                form: {
                    code: '',
                    password: ''
                },
                valueSubdivision: ''
            };
        },
        methods: {
            login: function () {
                this.axios.post(this.$config.API +'login', this.form).then((response) => {
                    if(response.data.msg === 'false'){
                        alert("Неверный пароль")
                    }
                    else {
                        this.$localStorage.set('user', response.data)
                        this.$router.push({ path: 'home' })
                        console.log(response.data)
                    }
                });
            },
            handleGetSubdivision() {
                this.axios.get(this.$config.API +'references/subdivisions').then((response) => {
                    this.valueSubdivision = response.data
                });
            }
        },
        created() {
            this.handleGetSubdivision();
        },
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

    .el-select {
        display: inline-block;
        position: i;
        width: 440px;
    }
</style>