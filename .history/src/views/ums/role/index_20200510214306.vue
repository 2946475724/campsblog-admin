<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="角色名"
          v-model="keyword"></el-input>
        <el-button size="mini" type="primary" @click="search">
          查询
        </el-button>
        <el-button class="btn-add" type="primary" size="mini">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="roleList" border>
        <el-table-column label="角色名" align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="角色描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status === 1 ? '启用' : '禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
              <el-button @click="deleteHandle(scope.row.id)" size="mini" type="text">删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="isEdit?'编辑角色':'添加角色'" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" ref="form" label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="form.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRoleList,
  } from "@/api/role";
  const defaultQuery = {
    keyword: "",
    pageNum: 1,
    pageSize: 5,
  };
  const defaultForm = {
    id: null,
    roleName: null,
    description: null,
    status: 1
  };
  export default {
    name: "role",
    data() {
      return {
        listQuery: Object.assign({}, defaultQuery),
        roleList: [],
        total: null,
        listLoading: true,
        keyword: "",
        dialogVisible: false,
        isEdit: false,
        form: ""
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取角色列表
      getList() {
        this.listLoading = true
        getRoleList().then(resp => {
          this.roleList = resp.data
        })
      },
      // 点击当前页
      handleCurrentChange(value) {
        this.pageNum = value;
        this.getList()
      },
      // 每页条数的改变
      handleSizeChange(value) {
        this.listQuery.pageSize = value
        this.getList()
      },
       handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.form = Object.assign({}, row);
       },
      // 删除友情链接
      deleteHandle(value) {
        let params = {
          id: value
        }
        this.$confirm("确认删除吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLinkById(params).then(resp => {
            if (resp.code === 200) {
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // // 添加文章
      // addArticle() {
      //   this.$router.push({
      //     path: '/ams/addArticle'
      //   });
      // },
      search() {
        this.listQuery.keyword = this.keyword
        this.getList()
      },
    },
  };
</script>

<style scoped>

</style>
