<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <OrderView></OrderView>
            </el-col>
            <el-col :span="23">
                <h2>Наряд-заказы</h2>
            </el-col>
        </el-row>
        <Line></Line>

        <el-collapse v-model="activeNames" @change="handleChange">
            <h3>Фильтр поиска</h3>
            <el-collapse-item title="Нажмите, чтобы скрыть" name="1">
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
                <el-row :gutter="24">
                    <el-button
                            id="searchButton"
                            type="primary"
                            @click="handleSearch()"
                            icon="el-icon-search">Поиск</el-button>
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
                            <el-col :span="1">
                                <el-button
                                        id="roundButton"
                                        type="primary"
                                        size="medium"
                                        icon="el-icon-edit"
                                        @click="handleEdit(props.$index, props.row)"
                                        circle></el-button>
                            </el-col>
                            <el-col :span="6">
                                <h2>Наряд-заказ №{{props.row.number}}</h2>
                            </el-col>
                            <el-col :span="17">
                            <el-button
                                    id="saveButton"
                                    :disabled=props.row.editable
                                    @click="handleSave(props.$index, props.row)"
                                    type="primary">Сохранить<i class="el-icon-upload el-icon-right"></i></el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h3>Информация о клиенте</h3>
                                <el-form-item label="Фамилия">
                                    <el-input v-model="props.row.client.surname" autocomplete="off" :disabled=props.row.editable></el-input>
                                </el-form-item>
                                <el-form-item label="Имя">
                                    <el-input v-model="props.row.client.name" autocomplete="off" :disabled=props.row.editable></el-input>
                                </el-form-item>
                                <el-form-item label="Отчество">
                                    <el-input v-model="props.row.client.patronymic" autocomplete="off" :disabled=props.row.editable></el-input>
                                </el-form-item>
                                <el-form-item label="Номер телефона">
                                    <el-input v-model="props.row.client.phone" :disabled=props.row.editable></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h3>Информация об изделии</h3>
                                <el-form-item label="Серийный номер">
                                    <el-input v-model="props.row.product.serial" autocomplete="off" :disabled=props.row.editable></el-input>
                                </el-form-item>
                                <el-form-item label="Производитель">
                                    <template>
                                        <el-select v-model="props.row.appliances_provider" placeholder="" :disabled=props.row.editable>
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
                                        <el-select v-model="props.row.appliances_view" placeholder="" :disabled=props.row.editable>
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
                                        <el-select v-model="props.row.appliances_model" placeholder="" :disabled=props.row.editable>
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
                                <h3>Информация о дефектах</h3>

                                <el-form-item label="Список дефектов">
                                    <el-select v-model="props.row.defect" multiple placeholder="Пожалуйста, выберите дефекты изделия" style="width: 100%;" :disabled=props.row.editable>
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
                                <h3>Проведённые работы (услуги)</h3>
                                <template>
                                    <el-table
                                            :data="props.row.tableDataInto"
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


                        <h3>Дополнительная информация</h3>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Принял">
                                    <el-input v-model="props.row.accepted" autocomplete="off" :disabled=props.row.editable></el-input>
                                </el-form-item>
                                <el-form-item label="Выполнил">
                                    <el-input v-model="props.row.fulfilled" autocomplete="off" :disabled="true"></el-input>
                                </el-form-item>

                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Дата принятия">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    :disabled="true"
                                                    v-model="props.row.date_receipt"
                                                    type="date"
                                                    placeholder="Выберите дату">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </el-form-item>
                                <el-form-item label="Дата выполнения">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    :disabled="true"
                                                    v-model="props.row.data_completion"
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
                                <el-form-item label="Срок гарантии">
                                    <template>
                                        <div class="block">
                                            <el-date-picker
                                                    :disabled=props.row.editable
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
                    label="Статус">
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
                            type="danger"
                            size="medium"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                            circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button-group id="pageButton">
            <el-button type="primary" icon="el-icon-arrow-left">Предыдущая</el-button>
            <el-button type="primary">Следующая<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
    import OrderView from '../components/OrderView'
    export default {
        name: "Orders",
        data() {
            return {
                activeNames: '1',
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
                    editable: true,
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
                row.editable = !row.editable

            },
            handleDelete(index, row) {

            },
            handleAddOrder() {

            },
            handleSearch() {

            },
            handleSave(index, row) {
                row.editable = !row.editable
            },
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

    #roundButton {
        margin-top: 15px;
    }

    #searchButton {
        margin-left: 15px;
    }

    #pageButton {
        margin-top: 40px;
    }

    #saveButton {
        margin-top: 10px;
    }


</style>