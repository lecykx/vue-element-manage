
<template>
    <div class="app-container">

        <h3 class="app-page-title">角色管理</h3>

        <!-- 页头 一些查询操作按钮 -->
        <div class="filter-container">
            <el-form :inline="true" :model="listQuery" class="filter-form">
                <el-form-item  style="margin-right:40px">
                    <el-button class="filter-item" type="danger" @click="handleCreate" size="large">
                        创建角色
                    </el-button>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-input style="width:160px" placeholder="输入查询角色名称" class="filter-item" v-model="listQuery.roleName" size="large">
                    </el-input>
                </el-form-item>
                <el-form-item class="fr" style="margin-right:0">
                    <el-button class="filter-item" @click="handleRest" size="large">
                        重置
                    </el-button>
                </el-form-item>
                <el-form-item class="fr">
                    <el-button class="filter-item" type="primary" v-waves @click="handleSearch" size="large">
                        查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 页体 表格 -->
        <div class="table">
            <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" border highlight-current-row style="width:100%;border-radius:5px">

                <el-table-column type="index" width="100" label="序号" align="center">
                </el-table-column>

                <el-table-column align="center" label="角色名称">
                    <template scope="scope">
                        <span>{{scope.row.roleName}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="300" align="center" label="角色代码">
                    <template scope="scope">
                        <span>{{scope.row.roleCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200" align="center" label="角色状态">
                    <template scope="scope">
                        <span>{{scope.row.state | roleStateFilter }}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200" align="center" label="创建时间">
                    <template scope="scope">
                        <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200" label="操作" align="center">
                    <template scope="scope">
                        <el-button size="small" type="text" @click="handleUpdate(scope.$index, scope.row)">修改
                        </el-button>
                    </template>

                </el-table-column>

            </el-table>
        </div>

        <!-- 页脚 页码导航 -->
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[10,20,50,100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next" :total="total" style="object-fit: contain">
            </el-pagination>
        </div>

        <!-- 新建界面 -->
        <el-dialog :title="textMap['create']" :visible.sync="dialogCreateFormVisible" size="tiny">
            <el-form class="small-space dialog-form" ref="createForm" :rules="createFormRules" :model="createForm" label-position="left" label-width="120px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="createForm.roleName" style="width:360px"></el-input>
                </el-form-item>
                <el-form-item label="角色代码" prop="roleCode">
                    <el-input v-model="createForm.roleCode" style="width:360px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCreate">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改界面 -->
        <el-dialog :title="textMap['update']" :visible.sync="dialogFormInformationVisible" size="tiny">
            <el-form class="small-space dialog-form" ref="informationForm" :rules="informationFormRules" :model="information" label-position="left" label-width="100px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="information.roleName" style="width:360px"></el-input>
                </el-form-item>
                <el-form-item label="角色代码" prop="roleCode">
                    <el-input v-model="information.roleCode" style="width:360px"></el-input>
                </el-form-item>
                <el-form-item label="角色状态" prop="state">
                    <el-select class="filter-item" v-model="information.state" style="width:360px">
                        <el-option v-for="item in roleStateOptions" :key="item.key" :label="item.display_name"
                                :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="dialogFormInformationVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpdate">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { selectByFilter, insertRole, updateRole } from '@/api/role';
    import { parseTime } from '@/utils/index';

    const roleStateOptions = [
        { key: '000', display_name: '正常' },
        { key: '101', display_name: '待开户' },
        { key: '102', display_name: '冻结' },
        { key: '999', display_name: '注销' }
    ];

    // arr to obj
    const roleStateKeyValue = roleStateOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});


    export default {
        name: 'roleManage',
        data() {

            return {
                listLoading: true,
                list: null,
                total: 0,

                listQuery: {
                    pageNo: 1,
                    pageSize: 10,
                    roleName: undefined
                },

                createForm: {
                    roleName: '',
                    roleCode: ''
                },

                createFormRules: {
                    roleCode: [
                        { required: true, message: '请输入角色代码', trigger: 'blur' }
                    ],
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ]
                },

                information: {
                    roleId: '',
                    roleName: '',
                    roleCode: '',
                    state: ''
                },

                informationFormRules: {
                    roleCode: [
                        { required: true, message: '请输入角色代码', trigger: 'blur' }
                    ],
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: '请选择角色状态', trigger: 'blur' }
                    ]
                },

                roleStateOptions,

                // 对话框form的部分
                dialogCreateFormVisible: false,
                dialogFormInformationVisible: false,
                textMap: {
                    update: '修改角色',
                    create: '创建角色'
                }
            };
        },
        created() {
            this.getList();
        },

        filters: {
            roleStateFilter(type) {
                return roleStateKeyValue[type]
            }
        },
        methods: {

            getList() {
                this.listLoading = true;

                selectByFilter(this.listQuery).then(response => {

                    this.list = response.data.result.datas;
                    this.total = response.data.result.rowCount;
                    this.listLoading = false;
                });
            },

            // 过滤搜索
            handleSearch() {
                this.getList();
            },

            handleRest() {
                this.listQuery = {
                    pageNo: 1,
                    pageSize: 10,
                    roleName: undefined
                }
            },

            // 新建的操作
            handleCreate() {
                this.createForm = {
                    roleName: '',
                    roleCode: ''
                };
                this.dialogCreateFormVisible = true;
            },
            submitCreate() {

                this.$refs.createForm.validate(valid => {
                    if (valid) {
                        insertRole(this.createForm).then(response => {

                            if (response.data.code === 200) {
                                this.dialogCreateFormVisible = false;
                                this.getList();
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                });

                            } else {

                                this.$notify({
                                    title: '失败',
                                    message: response.data.message,
                                    type: 'failure',
                                    duration: 2000
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },

            // 修改的操作
            handleUpdate(index, row) {
                this.information = Object.assign({}, row);
                this.dialogFormInformationVisible = true;
            },
            submitUpdate() {

                this.$refs.informationForm.validate(valid => {
                    if (valid) {
                        updateRole(this.information).then(response => {

                            if (response.data.code === 200) {

                                this.dialogFormInformationVisible = false;
                                this.getList();
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 2000
                                });

                            } else {

                                this.$notify({
                                    title: '失败',
                                    message: '修改失败',
                                    type: 'failure',
                                    duration: 2000
                                });
                            }

                        });
                    } else {
                        return false;
                    }
                });
            },

            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },

            handleCurrentChange(val) {
                this.listQuery.pageNo = val;
                this.getList();
            }
        }
    }
</script>