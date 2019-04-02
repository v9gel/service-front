<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <DefectAdd></DefectAdd>
            </el-col>
            <el-col :span="23">
                <h2>Дефекты</h2>
            </el-col>
        </el-row>
        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Название"
                    prop="name">
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
    import DefectAdd from '../components/DefectAdd'
    export default {
        name: "Defects",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/defects').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        },
        components: {
            DefectAdd
        }
    }
</script>

<style scoped>

</style>