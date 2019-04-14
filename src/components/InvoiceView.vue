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
                title="Накладная на перемещение"
                :visible.sync="dialogVisible"
                width="65%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <h3>Получатель</h3>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Подразделение">
                                    <template>
                                        <el-select v-model="form.recipient" value-key="id" placeholder="">
                                            <el-option
                                                    v-for="item in valueSubdivision"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Вид деятельности">
                                    <el-input v-model="form.recipient.activity.name" autocomplete="off" :disabled="true"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                    </div></el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-row :gutter="24">
                            <el-col :span="1">
                                <AddMovedProduct :form=form></AddMovedProduct>
                            </el-col>
                            <el-col :span="23">
                                <h3>Перемещаемые изделия</h3>
                            </el-col>
                        </el-row>
                        <template>
                            <el-table
                                    :data="form.movingProducts"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="number"
                                        label="№"
                                        width="60">
                                </el-table-column>
                                <el-table-column
                                        prop="product.model.view.name"
                                        label="Изделие"
                                        width="500">
                                </el-table-column>
                                <el-table-column
                                        prop="pack.name"
                                        label="Вид упаковки">
                                </el-table-column>
                                <el-table-column
                                        width="50">
                                    <template>
                                        <el-button
                                                type="primary"
                                                size="mini"
                                                icon="el-icon-edit"
                                                circle></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div></el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button type="primary" @click="handleAddDate()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import AddMovedProduct from "./AddMovedProduct";
    export default {
        name: "InvoiceView",
        components: {AddMovedProduct},
        data() {
            return {
                dialogVisible: false,
                form: {
                    number: '',
                    date_receipt: '',
                    sender: this.$localStorage.get('user'),
                    recipient: {
                        id: '',
                        activity: { name: '' }
                    },
                    movingProducts: [],
                },
                valueProduct: [],
                valueSubdivision: []
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

                console.log(this.form)

                this.axios.post(this.$config.API +'invoices', this.form).then((response) => {
                    this.$emit('update');
                });

            },
            handleGetSubdivision() {
                this.axios.get(this.$config.API +'filter/subdivisions/not/' + this.form.sender.id).then((response) => {
                    this.valueSubdivision = response.data
                });
            },
        },
        created() {
            this.handleGetSubdivision();
        },
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }

</style>
