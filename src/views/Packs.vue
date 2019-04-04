<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <PackAdd v-on:update="handleUpdate()"></PackAdd>
            </el-col>
            <el-col :span="23">
                <h2>Упаковки</h2>
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
                    label="Наименование"
                    width="300"
                    prop="name">
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
                        <el-col :span="21">
                            <PackEdit :form=scope.row v-on:update="handleUpdate"></PackEdit>
                        </el-col>
                        <el-col :span="3">
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
    import PackAdd from "../components/PackAdd";
    import PackEdit from "../components/PackEdit";
    export default {
        name: "Packs",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleDelete(index, row) {
                this.axios.delete(this.$config.API +'references/packs/' + row.id).then((response) => {
                    this.handleUpdate();
                });
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/packs').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        },
        components: {
            PackEdit,
            PackAdd
        },
    }
</script>

<style scoped>

</style>