<template>
    <div>
        <h2>Единицы измерения</h2>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Название"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Сокращение"
                    prop="symbol">
            </el-table-column>
            <el-table-column
                    label="Шифр"
                    prop="code">
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
                    <router-link :to="'/references/clients/' + scope.row.id">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                    </router-link>
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
        name: "Units",
        data() {
            return {
                tableData: [{
                    id: 1,
                    name: 'Килограмм',
                    code: '010',
                    symbol: 'кг.'
                },{
                    id: 1,
                    name: 'Килограмм',
                    code: '010',
                    symbol: 'кг.'
                },{
                    id: 1,
                    name: 'Килограмм',
                    code: '010',
                    symbol: 'кг.'
                }],
                search: '',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style scoped>

</style>