<template>
    <div>
        <h2>Клиенты</h2>
        <el-button type="primary" @click="dialogVisible = true">Добавить клиента</el-button>

        <Line></Line>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Фамилия"
                    prop="surname">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.surname" v-if="scope.row.editable"></el-input>
                    <div  v-if="!scope.row.editable">{{scope.row.surname}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="Имя"
                    prop="name">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" v-if="scope.row.editable"></el-input>
                    <div  v-if="!scope.row.editable">{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="Отчество"
                    prop="patronymic">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.patronymic" v-if="scope.row.editable"></el-input>
                    <div  v-if="!scope.row.editable">{{scope.row.patronymic}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    label="Телефон"
                    prop="phone">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.phone" v-if="scope.row.editable"></el-input>
                    <div  v-if="!scope.row.editable">{{scope.row.phone}}</div>
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
                            @click="scope.row.editable = !scope.row.editable">Изменить</el-button>
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
                dialogVisible: false,
                form: {
                    surname: '',
                    name: '',
                    patronymic: '',
                    phone: ''
                },
                tableData: null,
                search: '',
            }
        },
        methods: {
            handleAdd() {
                this.axios.post(this.$config.API +'references/clients', this.form).then((response) => {

                });
                this.dialogVisible = false;
                this.handleUpdate()
                this.handleUpdate()
            },
            handleEdit(index, row) {
                this.axios.post(this.$config.API +'references/clients/'+ this.row.id).then((response) => {

                });
                this.handleUpdate();
                this.handleUpdate();
            },
            handleClose() {
                this.dialogVisible = false;
            },
            handleDelete(index, row) {
                this.axios.delete(this.$config.API +'references/clients/' + row.id).then((response) => {

                });
                this.handleUpdate();
                this.handleUpdate();
            },
            handleUpdate() {
                this.axios.get(this.$config.API +'references/clients').then((response) => {
                    this.tableData = response.data
                });
            },
        },
        created() {
            this.handleUpdate();
        }
    }
</script>

<style scoped>

</style>