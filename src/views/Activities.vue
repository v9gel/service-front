<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <ActivitieAdd v-on:update="handleUpdate()"></ActivitieAdd>
            </el-col>
            <el-col :span="23">
                <h2>Виды деятельности</h2>
            </el-col>
        </el-row>
        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Наименование"
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
                    <el-row :gutter="24">
                        <el-col :span="20">
                            <ActivitieEdit :form=scope.row v-on:update="handleUpdate"></ActivitieEdit>
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
    import ActivitieEdit from '../components/ActivitieEdit';
    import ActivitieAdd from "../components/ActivitieAdd";
    export default {
        name: "Activities",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleDelete(index, row) {
                this.axios.delete(this.$config.API +'references/activities/' + row.id).then((response) => {
                    this.handleUpdate();
                });
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/activities').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        },
        components: {
            ActivitieAdd,
            ActivitieEdit
        },
    }
</script>

<style scoped>

</style>