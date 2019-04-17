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
                :data="packs.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                            <PackEdit :form=scope.row></PackEdit>
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
    import PackAdd from "./PackAdd";
    import PackEdit from "./PackEdit";
    export default {
        name: "Packs",
        data() {
            return {
                search: '',
            }
        },
        computed: {
            packs() {
                return this.$store.state.packs;
            }
        },
        methods: {
            handleDelete(index, row) {
                this.$store.dispatch('deletePack', row.id)
            }
        },
        components: {
            PackEdit,
            PackAdd
        },
    }
</script>

<style scoped>

</style>