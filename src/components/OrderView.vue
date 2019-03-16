<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">Оформить наряд-заказ</el-button>

        <el-dialog
                title="Наряд заказ"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form label-position='top' ref="form" :model="form" label-width="120px">
                <h3>Информация о клиенте</h3>
                <el-form-item label="Фамилия">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Имя">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Отчество">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Телефон">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <h3>Информация об изделии</h3>
                <el-form-item label="Серийный номер">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Производитель">
                    <el-select v-model="form.region" placeholder="Пожалуйста, выберите производителя" style="width: 100%;">
                        <el-option label="Zone one" value="shanghai"></el-option>
                        <el-option label="Zone two" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Вид техники">
                    <el-select v-model="form.region" placeholder="Пожалуйста, выберите вид" style="width: 100%;">
                        <el-option label="Zone one" value="shanghai"></el-option>
                        <el-option label="Zone two" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Модель">
                    <el-select v-model="form.region" placeholder="Пожалуйста, выберите модель" style="width: 100%;">
                        <el-option label="Zone one" value="shanghai"></el-option>
                        <el-option label="Zone two" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <h3>Гарантийная информация</h3>
                <el-form-item label="Номер">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Сроки">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="Pick a time" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <h3>Дефекты</h3>
                <el-form-item label="Список дефектов">
                    <el-select v-model="value5" multiple placeholder="Пожалуйста, выберите дефекты изделия" style="width: 100%;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <h3>Информация о сотруднике</h3>
                <el-form-item label="Принял">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button type="primary" @click="dialogVisible = false">Принять</el-button>
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
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
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
            }
        }
    }
</script>

<style scoped>

</style>