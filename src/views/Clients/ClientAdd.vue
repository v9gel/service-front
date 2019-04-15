<template>
    <div>
        <el-button
                id="roundButton"
                type="success"
                size="medium"
                icon="el-icon-plus"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Новый клиент"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" status-icon :rules="rules" label-width="150px">
                <el-form-item label="Фамилия" prop="surname">
                    <el-input v-model="form.surname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Имя" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Отчество" prop="patronymic">
                    <el-input v-model="form.patronymic" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Номер телефона" prop="phone">
                    <el-input v-model="form.phone"  autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Отмена</el-button>
            <el-button type="primary" @click="handleAddDate()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import AwesomeMask from 'awesome-mask'

    export default {
        name: "ClientAdd",
        data() {
            return {
                dialogVisible: false,
                form: {
                    surname: '',
                    name: '',
                    patronymic: '',
                    phone: ''
                },
                directives: {
                    'mask': AwesomeMask
                },
                rules: {
                    surname: [
                        {required: true, message: 'Пожалуйста, введите фамилию', trigger: 'blur'},
                        {min: 2, max: 30, message: 'Допустимая длинна от 2 до 30 символов', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: 'Пожалуйста, введите имя', trigger: 'blur'},
                        {min: 2, max: 30, message: 'Допустимая длинна от 2 до 30 символов', trigger: 'blur'}
                    ],
                    patronymic: [
                        {required: true, message: 'Пожалуйста, введите отчество', trigger: 'blur'},
                        {min: 5, max: 30, message: 'Допустимая длинна от 5 до 30 символов', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, pattern:/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: 'Пожалуйста, введите телефон', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('Вы действительно хотите закрыть этот диалог?')
                    .then(_ => {
                        this.dialogVisible = false;
                        this.$refs['form'].resetFields();
                        done();
                    })
                    .catch(_ => {});
            },
            handleAddDate() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addClient', this.form)
                        this.dialogVisible = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }
</style>