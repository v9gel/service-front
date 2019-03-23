<template>
    <div>
        <h2>Накладные</h2>
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

                    <el-form label-position='top' ref="form" :model="form" label-width="120px">
                        <h3>Наряд-заказ №{{props.row.number}}</h3>
                        <el-form-item label="Фамилия">
                            <el-input v-model="props.row.client.lastname"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя">
                            <el-input v-model="props.row.client.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество">
                            <el-input v-model="props.row.client.surname"></el-input>
                        </el-form-item>
                        <el-form-item label="Телефон">
                            <el-input v-model="props.row.client.phone"></el-input>
                        </el-form-item>
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

    export default {
        name: "Invoice"
    }

</script>

<style scoped>

</style>