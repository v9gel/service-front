<template>
    <div>
        <el-button
                id="roundButton"
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Изделие на перемещение"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-form-item label="Изделие">
                    <template>
                        <el-select v-model="formForMoved.product" value-key="id" placeholder="" :disabled=editable>
                            <el-option
                                    v-for="item in valueProduct"
                                    :key="item.id"
                                    :label="item.product.serial + '  ' + item.product.model.view.name"
                                    :value="item.product">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="Вид упаковки">
                    <template>
                        <el-select v-model="formForMoved.pack" value-key="id" placeholder="" :disabled=editable>
                            <el-option
                                    v-for="item in valuePack"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Отмена</el-button>
            <el-button type="primary" @click="handleAddMovedProduct()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AddMovedProduct",
        data() {
            return {
                dialogVisible: false,
                formForMoved: {
                    product: '',
                    pack: ''
                },
                valueProduct: [],
                valuePack: [],
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
            handleGetProduct() {
                this.axios.get(this.$config.API +'filter/product/eq/1').then((response) => {
                    this.valueProduct = response.data
                });
            },
            handleGetPack() {
                this.axios.get(this.$config.API +'references/packs').then((response) => {
                    this.valuePack = response.data
                });
            },
            handleAddMovedProduct() {
                this.dialogVisible = false

                this.form.tableDataProduct.push(
                    {
                        product: this.formForMoved.product,
                        pack: this.formForMoved.pack
                    })
            },
        },
        created() {
            this.handleGetProduct();
            this.handleGetPack();
        }
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }
</style>
