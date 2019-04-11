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

            <el-form label-position='left' ref="form" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
                <el-row :gutter="24">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация о клиенте</h3>
                        <el-form-item label="Фамилия" prop="surnameR">
                            <el-input v-model="form.client.surname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя" prop="nameR">
                            <el-input v-model="form.client.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество" prop="patronymicR">
                            <el-input v-model="form.client.patronymic" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Номер телефона" prop="phoneR">
                            <el-input v-model="form.client.phone"></el-input>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация об изделии</h3>
                        <el-form-item label="Серийный номер" prop="sNumberR">
                            <el-input v-model="form.product.serial" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Производитель" prop="manufacturerR">
                            <el-input v-model="form.product.model.provider.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Вид техники" prop="viewR">
                            <el-input v-model="form.product.model.view.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="Модель" prop="modelR">
                            <template>
                                <el-select v-model="form.product.model" value-key="id" l placeholder="">
                                    <el-option
                                            v-for="item in valueModel"
                                            :key="item.id"
                                            :label="item.name"
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
                        <el-form-item label="Срок гарантии" prop="guaranteeR">
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
                        <el-form-item label="Список дефектов" prop="defectsR">
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
                        <el-form-item label="Принял" prop="acceptR">
                            <el-input v-model="form.accepted" autocomplete="off"></el-input>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">Отмена</el-button>
            <el-button type="primary" @click="handleAddOrder('form')">Сохранить</el-button>
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
                        id: '',
                        surname: '',
                        name: '',
                        patronymic: '',
                        phone: '',
                    },
                    product: {
                        id: '',
                        serial: '',
                        date_begin: '',
                        date_end: '',
                        model: {
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

                    //Для валидаций
                    surnameR: '',
                    nameR: '',
                    patronymicR: '',
                    phoneR: '',
                    sNumberR: '',
                    manufacturerR: '',
                    viewR: '',
                    modelR: '',
                    guaranteeR: '',
                    defectsR: '',
                    acceptR: ''
                },
                rules: {
                    surnameR: [
                        { required: true, message: 'Please, input surname!', trigger: 'blur' },
                        { min: 3, max: 20, message: 'Length should be 3 to 20!', trigger: 'blur' }
                    ],
                    nameR: [
                        { required: true, message: 'Please, input name!', trigger: 'blur' },
                        { min: 3, max: 20, message: 'Length should be 3 to 20!', trigger: 'blur' }
                    ],
                    patronymicR: [
                        { required: true, message: 'Please, input patronymic!', trigger: 'blur' },
                        { min: 3, max: 20, message: 'Length should be 3 to 20!', trigger: 'blur' }
                    ],
                    phoneR: [
                        { required: true, message: 'Please, input phone!', trigger: 'blur' },
                    ],
                    sNumberR: [
                        { required: true, message: 'Please, input serial number!', trigger: 'blur' },
                    ]
                },
                valueModel: null,
                valueDefect: null,
                value5: null,
                value11: null,
                flagAddClient: false,
                flagAddProduct: false,
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
            handleAddOrder(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.product.date_begin = this.form.valueGarant[0]
                        this.form.product.date_end = this.form.valueGarant[1]

                        this.axios.post(this.$config.API + 'references/clients', this.form.client).then((response) => {
                            this.form.client.id = response.data.id

                            this.axios.post(this.$config.API + 'references/products', this.form.product).then((response) => {
                                this.form.product.id = response.data.id

                                this.axios.post(this.$config.API + 'orders', this.form).then((response) => {
                                    this.$emit('update');
                                });

                            });

                        });

                        this.dialogVisible = false
                    } else {
                        console.log('Error submit!');
                        return false;
                    }
                });
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
