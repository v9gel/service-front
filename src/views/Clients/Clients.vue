<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="1">
                <ClientAdd v-on:update="handleUpdate()"></ClientAdd>
            </el-col>
            <el-col :span="23">
                <h2>Клиенты</h2>
            </el-col>
        </el-row>
        <Line></Line>
        <el-table
                :data="clients.filter(data => !search || data.surname.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Фамилия"
                    width="200"
                    prop="surname">
            </el-table-column>
            <el-table-column
                    label="Имя"
                    width="200"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Отчество"
                    width="200"
                    prop="patronymic">
            </el-table-column>
            <el-table-column
                    label="Номер телефона"
                    width="200"
                    prop="phone">
            </el-table-column>
            <el-table-column
                    width="200"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Поиск..."/>
                </template>
                <template slot-scope="scope">
                    <el-row :gutter="24">
                        <el-col :span="17">
                            <ClientEdit :form=scope.row></ClientEdit>
                        </el-col>
                        <el-col :span="7">
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
    import ClientAdd from './ClientAdd'
    import ClientEdit from './ClientEdit'
    export default {
        name: "Clients",
        data() {
            return {
                tableData: null,
                search: '',
            }
        },
        computed: {
            clients() {
                return this.$store.state.clients;
            }
        },
        methods: {
            handleDelete(index, row) {
                this.$store.dispatch('deleteClient', row.id)
            }
        },
        components: {
            ClientEdit,
            ClientAdd
        },
    }
</script>

<style scoped>

</style>