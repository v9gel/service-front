<template>
    <div>
        <h2>Наряд-заказы</h2>
        <Line></Line>
        <OrderView></OrderView>

        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Фильтр поиска" name="1">
                <el-row :gutter="24">
                    <el-form label-position="left" label-width="170px" :model="formLabelAlign">
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
                            <el-form-item label="Дефекты">
                                <el-input v-model="filter.defect"></el-input>
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
                            <h3>Информация об изделии</h3>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Серийный номер">
                                    <el-input v-model="props.row.product.serial" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Производитель">
                                    <el-input v-model="props.row.product.appliances_provider" autocomplete="off"></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Вид техники">
                                    <el-input v-model="props.row.product.appliances_view" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Модель">
                                    <el-input v-model="props.row.product.appliances_model" autocomplete="off"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="24"><div class="grid-content bg-purple">
                                <h3>Информация об дефектах</h3>
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
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    width="200"
                    label="Изделие"
                    prop="name">
            </el-table-column>
            <el-table-column
                    width="200"
                    label="Дата приема"
                    prop="date_receipt">
            </el-table-column>
            <el-table-column
                    label="Дефекты"
                    prop="client.surname">
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
        name: "OrdersRepairs",
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
                    defect: '',
                },
                tableData: [{
                    number: '345',
                    name: 'Пылесос',
                    date_receipt: '2016-05-03',
                    product: {
                        serial: '',
                        appliances_model: '',
                        appliances_provider: '',
                        appliances_view: '',
                    },
                    defect: [],
                    tableDataInto: [{
                        number: '1',
                        name: 'вм',
                        price: '200',
                    }],
                    accepted: '',
                    fulfilled: '',
                    data_completion: '',
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

</style>