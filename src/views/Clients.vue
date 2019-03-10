<template>
    <div>
        <h2>Клиенты</h2>
        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Фамилия"
                    prop="lastname">
            </el-table-column>
            <el-table-column
                    label="Имя"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Отчество"
                    prop="surname">
            </el-table-column>
            <el-table-column
                    label="Телефон"
                    prop="phone">
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
                            @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
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
    import Line from "../components/Line";
    export default {
        name: 'Clients',
        components: {Line},
        data() {
            return {
                tableData: [{
                    lastname: 'Иванов',
                    name: 'Иван',
                    surname: 'Иванович',
                    phone: '+79991230000'
                },{
                    lastname: 'Иванов',
                    name: 'Иван',
                    surname: 'Иванович',
                    phone: '+79991230000'
                },{
                    lastname: 'Иванов',
                    name: 'Иван',
                    surname: 'Иванович',
                    phone: '+79991230000'
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