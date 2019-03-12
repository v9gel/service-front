<template>
    <div>
        <h2>Заказы</h2>
        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Изделие"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Принято"
                    prop="date">
            </el-table-column>
            <el-table-column
                    label="Клиент"
                    prop="client">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="Статус"
                    :filters="[{ text: 'Принято', value: 'Принято' }, { text: 'Заершено', value: 'Завершено' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.status === 'Завершено' ? 'success' : 'default'"
                            disable-transitions>{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Поиск..."/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Просмотр</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Orders",
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: 'Пылесос',
                    client: 'Иванов И.И.',
                    status: 'Принято'
                }, {
                    date: '2016-05-03',
                    name: 'Пылесос',
                    client: 'Иванов И.И.',
                    status: 'Завершено'
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
        }
    }
</script>

<style scoped>

</style>