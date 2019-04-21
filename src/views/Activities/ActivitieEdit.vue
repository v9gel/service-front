<template>
    <div>
        <el-button
                type="primary"
                size="medium"
                icon="el-icon-edit"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Вид деятельности"
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
        name: "ActivitieEdit",
        data() {
            return {
                dialogVisible: false,
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
                this.axios.post(this.$config.API +'references/activities/' + this.form.id, this.form).then((response) => {
                    this.$emit('update');
                });
            },
        }
    }
</script>

<style scoped>

</style>