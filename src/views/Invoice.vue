<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <InvoiceView></InvoiceView>
            </el-col>
            <el-col :span="23">
                <h2>Накладные</h2>
            </el-col>
        </el-row>
        <Line></Line>

        <el-collapse v-model="activeNames">
            <h3>Фильтр поиска</h3>
            <el-collapse-item title="Нажмите, чтобы скрыть" name="1">
                <el-row :gutter="24">
                    <el-form label-position="left" label-width="120px">
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
                            <el-form-item label="Получатель">
                                <template>
                                    <el-select v-model="filter.subdivision" placeholder="">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
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

                    <el-form label-position='top' ref="form" :model="form" label-width="130px">
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
                            <el-col :span="8">
                                <h2>Накладная на перемещение</h2>
                            </el-col>
                            <el-col :span="15">
                                <el-button
                                        id="saveButton"
                                        :disabled=editable
                                        @click="handleSave(props.$index, props.row)"
                                        type="primary">Сохранить<i class="el-icon-upload el-icon-right"></i></el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Номер">
                                    <el-input v-model="props.row.number" autocomplete="off" :disabled="true"></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <el-form-item label="Дата составления">
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
                            </div></el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h3>Отправитель</h3>
                                <el-row :gutter="24">
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <el-form-item label="Подразделение">
                                            <el-input v-model="props.row.sender.name" autocomplete="off" :disabled="true"></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <el-form-item label="Вид деятельности">
                                            <el-input v-model="props.row.sender.activity.name" autocomplete="off" :disabled="true"></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                </el-row>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple">
                                <h3>Получатель</h3>
                                <el-row :gutter="24">
                                    <el-col :span="12"><div class="grid-content bg-purple">
                                        <el-form-item label="Подразделение">
                                            <template>
                                                <el-select v-model="props.row.recipient.name" value-key="id" placeholder="" :disabled=editable>
                                                    <el-option
                                                            v-for="item in valueRecipient"
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
                                            <el-input v-model="props.row.recipient.activity.name" autocomplete="off" :disabled="true"></el-input>
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
                                                :disabled=editable
                                                id="roundButton"
                                                type="success"
                                                size="mini"
                                                icon="el-icon-plus"
                                                @click="handleAddTransfer(props.$index, props.row)"
                                                circle></el-button>
                                    </el-col>
                                    <el-col :span="23">
                                        <h3>Перемещаемые изделия</h3>
                                    </el-col>
                                </el-row>
                                <template>
                                    <el-table
                                            :data="props.row.movingProducts"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                prop="number"
                                                label="№"
                                                width="50">
                                        </el-table-column>
                                        <el-table-column
                                                prop="product"
                                                label="Изделие"
                                                width="650">
                                        </el-table-column>
                                        <el-table-column
                                                prop="pack"
                                                label="Вид упаковки">
                                        </el-table-column>
                                        <el-table-column
                                                width="50">
                                            <template slot-scope="scopeTransfer">
                                                <el-button
                                                        type="primary"
                                                        size="mini"
                                                        icon="el-icon-edit"
                                                        @click="handleEditTransfer(props.$index, props.row, scopeTransfer.$index, scopeTransfer.row)"
                                                        circle></el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
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
                    width="600"
                    label="Изделия"
                    prop="appliances_view">
            </el-table-column>
            <el-table-column
                    label="Дата составления"
                    prop="date_receipt">
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
        <el-pagination
                id = "pagePag"
                background
                layout="prev, pager, next"
                :current-page = page
                :total="100">
        </el-pagination>
    </div>
</template>

<script>

    import InvoiceView from '../components/InvoiceView'
    export default {
        name: "Invoice",
        data() {
            return {
                activeNames: '1',
                page: '1',
                filter: {
                    appliances_view: '',
                    pickerOptions1: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                    },
                    value11: '',
                    value12: '',
                    subdivision: '',
                },
                body: [],
                dop: [],
                editable: true,
                tableData: [{
                    id: '',
                    number: '',
                    date_receipt: '',
                    sender: {
                        id: '',
                        name: '',
                        activity: {
                            id: '',
                            name: '',
                        }
                    },
                    recipient: {
                        id: '',
                        name: '',
                        activity: {
                            id: '',
                            name: '',
                        }
                    },
                    movingProducts: [{
                        product: null,
                        pack: null,
                    }],
                }],
                search: '',
                valueRecipient: [],
                valueProduct: [],
                valuePack: []
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
                this.editable = ! this.editable
            },
            handleDelete(index, row) {

            },
            handleAddInvoice() {

            },
            handleSearch() {

            },
            handleAddTransfer(index, row) {

            },
            handleEditTransfer(index, row, indexTransfer, rowTransfer) {

            },
            handleSave(index, row) {
                this.editable = !this.editable
            },
            handleGetProducts() {

            },
            handleGetPacks() {

            },
            handleGetInvoices() {
                this.axios.get(this.$config.API +'references/packs').then((response2) => {
                    this.valuePack = response2.data
                    this.axios.get(this.$config.API +'references/products').then((response1) => {
                        this.valueProduct = response1.data
                        this.axios.get(this.$config.API +'invoices/' + this.$localStorage.get('user').id).then((response) => {
                            this.dop = response.data
                            this.body = response.data.map(function (invoice) {
                                invoice.movingProducts = [{product: '', pack: ''}]

                                invoice.movingProducts = invoice.products.map(function (moving) {
                                        return {
                                            pack: moving.InvoiceProducts.packId,
                                            product: moving.id
                                        }
                                    })
                                return invoice
                            })
                            this.tableData = this.body
                        });
                    });
                });


            }
        },
        components: {
            InvoiceView
        },
        created() {
            console.log(this.valuePack.find(x => x.id === 1))
            this.handleGetInvoices()
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

    #saveButton {
        margin-top: 10px;
    }

    #pagePag {
        margin-top: 50px;
        margin-left: 300px;
    }



</style>
