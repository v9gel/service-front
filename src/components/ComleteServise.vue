<template>
    <div>
        <el-button
                id="roundButton"
                type="success"
                size="medium"
                icon="el-icon-plus"
                @click="dialogVisible = true"
                circle></el-button>
        <el-dialog
                title="Наряд заказ"
                :visible.sync="dialogVisible"
                width="65%"
                :before-close="handleClose">

            <el-form label-position='left' ref="form" :model="form" label-width="150px">
                <el-row :gutter="24">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация о клиенте</h3>
                        <el-form-item label="Фамилия">
                            <el-input v-model="form.client.surname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Имя">
                            <el-input v-model="form.client.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Отчество">
                            <el-input v-model="form.client.patronymic" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Номер телефона">
                            <el-input v-model="form.client.phone"></el-input>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <h3>Информация об изделии</h3>
                        <el-form-item label="Серийный номер">
                            <el-input v-model="form.product.serial" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Производитель">
                            <template>
                                <el-select v-model="form.appliances_provider" placeholder="">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="Вид техники">
                            <template>
                                <el-select v-model="form.appliances_view" placeholder="">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="Модель">
                            <template>
                                <el-select v-model="form.appliances_model" placeholder="">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Гарантийная информация</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Срок гарантии">
                            <template>
                                <div class="block">
                                    <el-date-picker
                                            v-model="form.value21"
                                            type="daterange"
                                            align="right"
                                            unlink-panels
                                            start-placeholder="Дата начала"
                                            end-placeholder="Дата завершения"
                                            :picker-options="form.pickerOptions2">
                                    </el-date-picker>
                                </div>
                            </template>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Информация о дефектах</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Список дефектов">
                            <el-select v-model="form.defect" multiple placeholder="Пожалуйста, выберите дефекты изделия" style="width: 100%;">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div></el-col>
                </el-row>

                <h3>Информация о сотруднике</h3>
                <el-row :gutter="24">
                    <el-col :span="24"><div class="grid-content bg-purple">
                        <el-form-item label="Принял">
                            <el-input v-model="form.accepted" autocomplete="off"></el-input>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Отмена</el-button>
            <el-button type="primary" @click="handleAddDate()">Сохранить</el-button>
          </span>
        </el-dialog>
    </div>
    
</template>

<script>
    export default {
        name: "ComleteServise"
    }
</script>

<style scoped>

</style>