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
                title="Подразделение"
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

                <el-form-item label="Вид деятельности">
                    <el-select v-model="form.activity" placeholder="">
                        <el-option
                                v-for="item in valueActivity"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
        name: "SubdivisionsAdd",
        data() {
            return {
                dialogVisible: false,
                form: {
                    name: '',
                    code: '',
                    activity: ''
                },
                valueActivity: null
            }
        },
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
            handleAddDate() {
                this.dialogVisible = false
                this.axios.post(this.$config.API +'references/subdivisions', this.form).then((response) => {
                    this.$emit('update');
                });
            },
            handleGetActivity() {
                this.axios.get(this.$config.API +'references/activities').then((response) => {
                    this.valueActivity = response.data
                });
            }
        },
        created() {
            this.handleGetActivity();
        },
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }
</style>