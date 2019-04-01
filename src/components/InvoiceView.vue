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
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-form-item label="Номер">
                            <el-input v-model="form.number" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-form-item label="Дата составления">
                            <template>
                                <div class="block">
                                    <el-date-picker
                                            :disabled="true"
                                            v-model="form.date_receipt"
                                            type="date"
                                            placeholder="Выберите дату">
                                    </el-date-picker>
                                </div>
                            </template>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <h3>Получатель</h3>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Подразделение">
                                    <template>
                                        <el-select v-model="form.recipient.subdivision" placeholder="">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Вид деятельности">
                                    <el-input v-model="form.recipient.activity" autocomplete="off" :disabled="true"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                    </div></el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-row :gutter="24">
                            <el-col :span="1">
                                <el-button
                                        id="roundButton"
                                        type="success"
                                        size="mini"
                                        icon="el-icon-plus"
                                        circle></el-button>
                            </el-col>
                            <el-col :span="23">
                                <h3>Перемещаемые изделия</h3>
                            </el-col>
                        </el-row>
                        <template>
                            <el-table
                                    :data="form.tableDataProduct"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="number"
                                        label="№"
                                        width="60">
                                </el-table-column>
                                <el-table-column
                                        prop="appliances_view"
                                        label="Изделие"
                                        width="500">
                                </el-table-column>
                                <el-table-column
                                        prop="packaging"
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
    export default {
        name: "InvoiceView",
        data() {
            return {
                dialogVisible: false,
                form: {
                    number: '',
                    appliances_view: '',
                    date_receipt: '',
                    sender: {
                        subdivision: '',
                        activity: '',
                    },
                    recipient: {
                        subdivision: '',
                        activity: '',
                    },
                    tableDataProduct: [{
                        number: '',
                        appliances_view: '',
                        packaging: '',
                    }],
                },
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                }, {
                    value: 'Option2',
                    label: 'Option2'
                }, {
                    value: 'Option3',
                    label: 'Option3'
                }, {
                    value: 'Option4',
                    label: 'Option4'
                }, {
                    value: 'Option5',
                    label: 'Option5'
                }],
                value5: [],
                value11: []
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
            }
        }
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }

</style>