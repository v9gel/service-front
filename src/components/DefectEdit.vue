<template>
    <div>
        <el-button
                type="primary"
                size="medium"
                icon="el-icon-edit"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Дефект"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="props" label-width="150px">
                <el-form-item label="Шифр">
                    <el-input v-model="code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Наименование">
                    <el-input v-model="name" autocomplete="off"></el-input>
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
        name: "DefectEdit",
        data() {
            return {
                dialogVisible: false,
            }
        },
        props: ['name', 'code'],
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
                this.$emit('update')
                this.dialogVisible = false
                this.axios.post(this.$config.API +'references/defects', {code:this.props.code, name:this.props.name}).then((response) => {

                });
            },
        }
    }
</script>

<style scoped>

</style>