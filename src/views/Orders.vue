<template>
    <div>
        <h2>Наряд-заказы</h2>
        <Line></Line>
        <OrderView></OrderView>

        <el-collapse>
            <el-collapse-item title="Фильтр поиска" name="1">
                <el-row :gutter="24">
                    <el-form label-position="left" label-width="170px">
                        <el-col :span="12">
                            <el-form-item label="Изделие">
                                <el-input v-model="filter.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Период">
                                <template>
                                    <div class="block">
                                        <el-date-picker
                                                v-model="filter.value11"
                                                type="daterange"
                                                align="right"
                                                unlink-panels
                                                start-placeholder="С"
                                                end-placeholder="До"
                                                :picker-options="filter.pickerOptions1">
                                        </el-date-picker>
                                    </div>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Клиент">
                                <el-input v-model="filter.client"></el-input>
                            </el-form-item>
                            <el-form-item label="Статус заказа" prop="type">
                                <el-checkbox-group v-model="filter.status">
                                    <el-checkbox label="Принят" name="type"></el-checkbox>
                                    <el-checkbox label="В ремонте" name="type"></el-checkbox>
                                    <el-checkbox label="Завершен" name="type"></el-checkbox>
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
                        <el-row :gutter="24">
                            <h2>Наряд-заказ №{{props.row.number}}</h2>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h4>Информация о клиенте</h4>
                                <el-form-item label="Фамилия">
                                    <el-input v-model="props.row.client.surname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Имя">
                                    <el-input v-model="props.row.client.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Отчество">
                                    <el-input v-model="props.row.client.patronymic" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Номер телефона">
                                    <el-input v-model="props.row.client.phone"></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h4>Информация об изделии</h4>
                                <el-form-item label="Серийный номер">
                                    <el-input v-model="props.row.product.serial" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Производитель">
                                    <template>
                                        <el-select v-model="props.row.appliances_provider" placeholder="">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Вид техники">
                                    <template>
                                        <el-select v-model="props.row.appliances_view" placeholder="">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Модель">
                                    <template>
                                        <el-select v-model="props.row.appliances_model" placeholder="">
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
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="24"><div class="grid-content bg-purple">
                                <h4>Информация об дефектах</h4>
                                <el-form-item label="Список дефектов">
                                    <el-select v-model="props.row.defect" multiple placeholder="Пожалуйста, выберите дефекты изделия" style="width: 100%;">
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
                                            :data="props.row.tableDataInto"
                                            style="width: 100%">
                                        <el-table-column type="expand">
                                            <template slot-scope="props1">
                                                <el-form label-position='right' ref="form" :model="form" label-width="120px">
                                                    <el-row :gutter="24">
                                                        <el-col :span="12"><div class="grid-content bg-purple">
                                                            <el-form-item label="Наименование">
                                                                <el-input v-model="props1.row.name" autocomplete="off"></el-input>
                                                            </el-form-item>
                                                        </div></el-col>
                                                        <el-col :span="12"><div class="grid-content bg-purple">
                                                            <el-form-item label="Цена">
                                                                <el-input v-model="props1.row.price" autocomplete="off"></el-input>
                                                            </el-form-item>
                                                        </div></el-col>
                                                    </el-row>
                                                    <el-row :gutter="24">
                                                        <el-col :span="20"><div class="grid-content bg-purple">
                                                            " "
                                                        </div></el-col>
                                                        <el-col :span="4"><div class="grid-content bg-purple">
                                                            <el-button type="primary" @click="dialogVisible = false">Сохранить</el-button>
                                                        </div></el-col>
                                                    </el-row>
                                                </el-form>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="№"
                                                prop="number">
                                        </el-table-column>
                                        <el-table-column
                                                label="Наименование"
                                                prop="name">
                                        </el-table-column>
                                        <el-table-column
                                                label="Цена"
                                                prop="price">
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </div></el-col>
                        </el-row>


                        <h4>Дополнительная информация</h4>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Принял">
                                    <el-input v-model="props.row.accepted" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Выполнил">
                                    <el-input v-model="props.row.fulfilled" autocomplete="off"></el-input>
                                </el-form-item>

                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Дата принятия">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    v-model="props.row.date_receipt"
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
                                                    v-model="props.row.data_completion"
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
                                                    v-model="props.row.value21"
                                                    type="daterange"
                                                    align="right"
                                                    unlink-panels
                                                    start-placeholder="Дата начала"
                                                    end-placeholder="Дата завершения"
                                                    :picker-options="props.row.pickerOptions2">
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
                    label="Дата приема"
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
                filter: {
                    name: '',
                    pickerOptions1: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    },
                    value11: '',
                    value12: '',
                    client: '',
                    status: []
                },
                tableData: [{
                    number: '345',
                    name: 'Пылесос',
                    date_receipt: '2016-05-03',
                    status: 'Принят',
                    client: {
                        surname: 'f',
                        name: 'f',
                        patronymic: 'f',
                        phone: 'f',
                    },
                    product: {
                        serial: '',
                        date_begin: '',
                        date_end: '',
                        appliances_model: '',
                        appliances_provider: '',
                        appliances_view: '',
                    },
                    defect: [],
                    tableDataInto: [{
                        number: '1',
                        name: 'вм',
                        price: '200',
                    },
                        {
                            number: '1',
                            name: 'вм',
                            price: '200',
                        },
                        {
                            number: '1',
                            name: 'вм',
                            price: '200',
                        },
                        {
                            number: '1',
                            name: 'вм',
                            price: '200',
                        },
                        {
                            number: '1',
                            name: 'вм',
                            price: '200',
                        },
                        {
                            number: '1',
                            name: 'вм',
                            price: '200',
                        }],
                    accepted: 'Зейдель',
                    fulfilled: '',
                    data_completion: '',
                    pickerOptions2: {

                    },
                    value21: '',
                    value22: '',
                }],
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