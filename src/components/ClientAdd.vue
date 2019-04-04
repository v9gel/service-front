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
                title="Клиент"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-form-item label="Фамилия">
                    <el-input v-model="form.surname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Имя">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Отчество">
                    <el-input v-model="form.patronymic" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Номер телефона">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button type="primary" @click="handleAddDate()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
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
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleClose(done) {
                this.$confirm('Вы действительно хотите закрыть этот диалог?')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleAddDate() {
                this.dialogVisible = false
                this.axios.post(this.$config.API +'references/clients', this.form).then((response) => {
                    this.$emit('update');
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