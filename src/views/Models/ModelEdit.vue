<template>
    <div>
        <el-button
                type="primary"
                size="medium"
                icon="el-icon-edit"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Модель"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-form-item label="Шифр">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Наименование">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Вид техники">
                    <el-select v-model="form.view.id" placeholder="">
                        <el-option
                                v-for="item in valueView"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Производитель">
                    <el-select v-model="form.provider" placeholder="">
                        <el-option
                                v-for="item in valueProvider"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Отмена</el-button>
            <el-button type="primary" @click="handleEditDate()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ModelEdit",
        data() {
            return {
                dialogVisible: false,
                valueView: null,
                valueProvider: null
            }
        },
        props: ['form'],
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleClose(done) {
                this.$confirm('Вы действительно хотите закрыть этот диалог?')
                    .then(_ => {
                        this.dialogVisible = false;
                        this.$emit('update');
                        done();
                    })
                    .catch(_ => {});
            },
            handleEditDate() {
                this.dialogVisible = false
                this.axios.post(this.$config.API +'references/models/' + this.form.id, this.form).then((response) => {
                    this.$emit('update');
                });
            },
            handleGetView() {
                this.axios.get(this.$config.API +'references/views').then((response) => {
                    this.valueView = response.data
                });
            },
            handleGetProvider() {
                this.axios.get(this.$config.API +'references/providers').then((response) => {
                    this.valueProvider = response.data
                });
            },
        },
        created() {
            this.handleGetView();
            this.handleGetProvider();
        },
    }
</script>

<style scoped>

</style>