<template>
    <div>
        <h2>Наряд-заказы</h2>
        <Line></Line>
        <OrderView></OrderView>

        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Фильтр поиска" name="1">
                <el-row :gutter="20">
                    <el-form label-position="top" label-width="100px" :model="formLabelAlign">
                        <el-col :span="6">
                            <el-form-item label="Изделия">
                                <el-input v-model="filter.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Начало периоода">
                                <el-date-picker type="date" placeholder="Pick a date" v-model="filter.start" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="Конец периода">
                                <el-date-picker type="date" placeholder="Pick a date" v-model="filter.end" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Клиенты">
                                <el-input v-model="filter.client"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Activity type" prop="type">
                                <el-checkbox-group v-model="filter.status">
                                    <el-checkbox label="Online activities" name="type"></el-checkbox>
                                    <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                                    <el-checkbox label="Offline activities" name="type"></el-checkbox>
                                    <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </el-collapse-item>
        </el-collapse>
        <el-table
                :data="tableData"
                style="width: 100%">

            <el-table-column type="expand">
                <template slot-scope="props">

                    <el-form label-position='left' ref="form" :model="form" label-width="130px">
                        <h2>Наряд-заказ №{{props.row.number}}</h2>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h4>Информация о клиенте</h4>
                                <el-form-item label="Фамилия">
                                    <el-input v-model="props.row.client.lastname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Имя">
                                    <el-input v-model="props.row.client.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Отчество">
                                    <el-input v-model="props.row.client.surname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Номер телефона">
                                    <el-input v-model="props.row.client.phone"></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h4>Информация об изделии</h4>
                                <el-form-item label="Серийный номер">
                                    <el-input v-model="props.row.client.lastname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Производитель">
                                    <el-input v-model="props.row.client.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Вид техники">
                                    <el-input v-model="props.row.client.surname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Модель">
                                    <el-input v-model="props.row.client.phone"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="24"><div class="grid-content bg-purple">
                                <h4>Информация об дефектах</h4>
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
                            </div></el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="24"><div class="grid-content bg-purple">
                                <h4>Проведённые работы (услуги)</h4>
                                <template>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="number"
                                                label="№"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="Наименование"
                                                width="700">
                                        </el-table-column>
                                        <el-table-column
                                                prop="price"
                                                label="Цена">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </div></el-col>
                        </el-row>


                        <h4>Дополнительная информация</h4>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Принял">
                                    <el-input v-model="props.row.client.lastname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Выполнил">
                                    <el-input v-model="props.row.client.name" autocomplete="off"></el-input>
                                </el-form-item>

                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Дата принятия">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="value1"
                                                    type="date"
                                                    placeholder="Pick a day">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Дата выполнения">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="value1"
                                                    type="date"
                                                    placeholder="Pick a day">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </el-form-item>
                            </div></el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="24"><div class="grid-content bg-purple">
                                <el-form-item label="Срок гарантии">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="value7"
                                                    type="daterange"
                                                    align="right"
                                                    unlink-panels
                                                    start-placeholder="Дата начала"
                                                    end-placeholder="Дата завершения"
                                                    :picker-options="pickerOptions2">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Изделие"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Дата приемма"
                    prop="date_receipt">
            </el-table-column>
            <el-table-column
                    label="Клиент"
                    prop="client.surname">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="Статус"
                    :filters="[{ text: 'Принят', value: 'Принят' }, { text: 'Заершен', value: 'Завершен' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 'Завершен' ? 'success' : 'default'"
                            disable-transitions>{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    width="100">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                            circle></el-button>
                    <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                            circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import OrderView from '../components/OrderView'
    export default {
        name: "Orders",
        data() {
            return {
                pickerOptions2: {

                },
                value6: '',
                value7: '',
                filter: {
                    name: '',
                    start: '',
                    end: '',
                    client: '',
                    status: []
                },
                tableData: [{
                    number: '345',
                    name: 'Пылесос',
                    date_receipt: '2016-05-03',
                    status: 'Принят',
                    client: {
                        lastname: 'f',
                        name: 'f',
                        surname: 'f',
                        phone: 'f'
                    }
                }, {
                    name: 'Соковыжималка',
                    client: 'Федоров И.Т.',
                    date_receipt: '2016-05-03',
                    status: 'Завершен'
                },
                {
                    name: 'Пылесос',
                    client: 'Иван В.И.',
                    date_receipt: '2016-05-03',
                    status: 'Принят'
                }, {
                    name: 'Соковыжималка',
                    client: 'Федоров И.Т.',
                    date_receipt: '2016-05-03',
                    status: 'Завершен'
                },
                ],
                search: '',
            }
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        components: {
            OrderView
        }
    }

</script>

<style scoped>
    .box-card {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .el-form-item {
        margin-right: 30px;
    }



</style>