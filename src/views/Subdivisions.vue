<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <SubdivisionsAdd v-on:update="handleUpdate()"></SubdivisionsAdd>
            </el-col>
            <el-col :span="23">
                <h2>Подразделения</h2>
            </el-col>
        </el-row>
        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Шифр"
                    width="100"
                    prop="code">
            </el-table-column>
            <el-table-column
                    label="Наименование"
                    width="200"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Вид деятельности"
                    width="200"
                    prop="activity.name">
            </el-table-column>
            <el-table-column
                    width="500"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Поиск..."/>
                </template>
                <template slot-scope="scope">
                    <el-row :gutter="24">
                        <el-col :span="20">
                            <SubdivisionsEdit :form=scope.row v-on:update="handleUpdate"></SubdivisionsEdit>
                        </el-col>
                        <el-col :span="4">
                            <el-button
                                    type="danger"
                                    size="medium"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)"
                                    circle></el-button>
                        </el-col>

                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import SubdivisionsAdd from "../components/SubdivisionsAdd";
    import SubdivisionsEdit from "../components/SubdivisionsEdit";
    export default {
        name: "Subdivisions",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleDelete(index, row) {
                this.axios.delete(this.$config.API +'references/subdivisions/' + row.id).then((response) => {
                    this.handleUpdate();
                });
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/subdivisions').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        },
        components: {
            SubdivisionsEdit,
            SubdivisionsAdd
        },
    }
</script>

<style scoped>

</style>