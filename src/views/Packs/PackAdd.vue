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
                title="Упаковка"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" status-icon :rules="rules" :model="form" label-width="150px">
                <el-form-item label="Наименование" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
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
    export default {
        name: "PackAdd",
        data() {
            return {
                dialogVisible: false,
                form: {
                    name: ''
                },
                rules: {
                    name: [
                        {required: true, message: 'Пожалуйста, введите название упаковки', trigger: 'blur'},
                        {min: 3, max: 30, message: 'Допустимая длинна от 3 до 30 символов', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('Вы действительно хотите закрыть этот диалог?')
                    .then(_ => {
                        this.dialogVisible = false;
                        this.$store.dispatch('getPacks')
                        done();
                    })
                    .catch(_ => {});
            },
            handleAddDate() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addPack', this.form)
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