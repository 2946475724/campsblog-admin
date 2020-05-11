<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="font-size: 14px;">菜单列表</div>
    </el-card>
    <div class="table-container">
      <el-table :data="list" style="width: 100%;" v-loading="listLoading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-table :data="scope.row.children" :show-header="false" style="width: 100%;padding: 0;margin: 0;">
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <span>{{ scope_child.row.title }}</span>
                  </template>
                </el-table-column>
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <span>{{ scope_child.level === 0 ? '一级' : '二级' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <el-tag type="">{{scope_child.row.name}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <svg-icon :icon-class="scope_child.row.icon"></svg-icon>
                  </template>
                </el-table-column>
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <span>{{ scope_child.row.hidden === 0 ? "显示" : "隐藏" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label align="center">
                  <template slot-scope="scope_child">
                    <span>{{ scope_child.row.sort }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot-scope="scope_child">
                    <el-switch v-model="scope_child.row.hidden===0?true:false" active-color="#409eff" inactive-color="#C0CCDA"
                      @change="handleChange(scope_child.row)">
                    </el-switch>
                    <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="菜单级数" align="center">
          <template slot-scope="scope">{{scope.row.level === 0 ? '一级' : '二级'}}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template slot-scope="scope">
            <el-tag type="">{{scope.row.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="前端图标" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">{{scope.row.hidden === 0 ? "显示" : "隐藏"}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.hidden" active-color="#409eff" inactive-color="#C0CCDA"
              @change="handleChange(scope.row)">
            </el-switch>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {
    createUser,
    updateUser,
    updateStatus,
    deleteUser,
    allocUserId,
    allocRole
  } from '@/api/login';
  import {
    getMenuList,
    fetchTreeList
  } from '@/api/menu'
  import {
    fetchAllRoleList,
    getRoleListByUserId,
    updateUserRole
  } from '@/api/role';
  import {
    formatDate
  } from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5
  };
  const defaultForm = {
    id: null,
    username: null,
    password: null,
    nickName: null,
    email: null,
    note: null,
    status: 1
  };
  export default {
    name: 'adminList',
    data() {
      return {
        keyword: "",
        listQuery: Object.assign({}, defaultListQuery),
        parentId: 0,
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        form: Object.assign({}, defaultForm),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleName: "",
        allocRoleId: "",
        allocUserId: "",
        allRoleList: [],
        isHidden: 0
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      // 获取菜单列表
      getList() {
        this.listLoading = true;
        fetchTreeList().then(resp => {
          this.listLoading = false;
          this.list = resp.data
          this.total = resp.data.total;
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearch() {
        this.listQuery.keyword = this.keyword
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.form = Object.assign({}, defaultForm);
      },
      // 处理菜单显示与隐藏
      handleChange(value) {
        console.log(value)
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {
            status: row.status
          }).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      // 删除用户
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },


    }
  }

</script>
<style></style>
