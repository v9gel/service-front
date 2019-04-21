<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <ModelAdd v-on:update="handleUpdate()"></ModelAdd>
            </el-col>
            <el-col :span="23">
                <h2>Модели</h2>
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
                    label="Вид техники"
                    width="200"
                    prop="view.name">
            </el-table-column>
            <el-table-column
                    label="Производитель"
                    width="200"
                    prop="provider.name">
            </el-table-column>
            <el-table-column
                    width="300"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Поиск..."/>
                </template>
                <template slot-scope="scope">
                    <el-row :gutter="24">
                        <el-col :span="18">
                            <ModelEdit :form=scope.row v-on:update="handleUpdate"></ModelEdit>
                        </el-col>
                        <el-col :span="6">
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
    import ModelAdd from "./ModelAdd";
    import ModelEdit from "./ModelEdit";
    export default {
        name: "Models",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleDelete(index, row) {
                this.axios.delete(this.$config.API +'references/models/' + row.id).then((response) => {
                    this.handleUpdate();
                });
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/models').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        },
        components: {
            ModelEdit,
            ModelAdd,
        },
    }
</script>

<style scoped>

</style>