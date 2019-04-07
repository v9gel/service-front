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
                title="Наряд заказ"
                :visible.sync="dialogVisible"
                width="65%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-row :gutter="24">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация о клиенте</h3>
                        <el-form-item label="Фамилия">
                            <el-input v-model="form.client.surname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя">
                            <el-input v-model="form.client.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество">
                            <el-input v-model="form.client.patronymic" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Номер телефона">
                            <el-input v-model="form.client.phone"></el-input>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация об изделии</h3>
                        <el-form-item label="Серийный номер">
                            <el-input v-model="form.product.serial" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Производитель">
                            <el-input v-model="form.product.appliances_model.provider.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Вид техники">
                            <el-input v-model="form.product.appliances_model.view.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Модель">
                            <template>
                                <el-select v-model="form.product.appliances_model" value-key="id" l placeholder="">
                                    <el-option
                                            v-for="item in valueModel"
                                            :key="item.id"
                                            :label="item.provider.name + ' ' + item.name"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Гарантийная информация</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Срок гарантии">
                            <template>
                                <div class="block">
                                    <el-date-picker
                                            v-model="form.valueGarant"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            start-placeholder="Дата начала"
                                            end-placeholder="Дата завершения"
                                            :picker-options="form.pickerOptions2">
                                    </el-date-picker>
                                </div>
                            </template>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Информация о дефектах</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Список дефектов">
                            <el-select v-model="form.defect" multiple placeholder="Пожалуйста, выберите дефекты изделия" style="width: 100%;">
                                <el-option
                                        v-for="item in valueDefect"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Информация о сотруднике</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Принял">
                            <el-input v-model="form.accepted" autocomplete="off"></el-input>
                        </el-form-item>
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
        name: "OrderView",
        data() {
            return {
                dialogVisible: false,
                form: {
                    number: '',
                    name: '',
                    date_receipt: '',
                    status: '',
                    client: {
                        surname: '',
                        name: '',
                        patronymic: '',
                        phone: '',
                    },
                    product: {
                        serial: '',
                        date_begin: '',
                        date_end: '',
                        appliances_model: {
                            provider: { name: ''},
                            view: { name: ''}
                        }
                    },
                    defect: [],
                    tableDataInto: [{
                        number: '',
                        name: '',
                        price: '',
                    }],
                    accepted: '',
                    fulfilled: '',
                    data_completion: '',
                    pickerOptions2: {

                    },
                    valueGarant: '',
                    value22: '',
                },
                valueModel: null,
                valueDefect: null,
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
                this.axios.post(this.$config.API +'orders', this.form).then((response) => {
                    this.$emit('update');
                });
                this.dialogVisible = false
            },
            handleGetModel() {
                this.axios.get(this.$config.API +'references/models').then((response) => {
                    this.valueModel = response.data
                });
            },
            handleGetDefect() {
                this.axios.get(this.$config.API +'references/defects').then((response) => {
                    this.valueDefect = response.data
                });
            },
        },
        created() {
            this.handleGetModel();
            this.handleGetDefect();
        },
    }
</script>

<style scoped>
    #roundButton {
        margin-top: 15px;
    }

</style>
