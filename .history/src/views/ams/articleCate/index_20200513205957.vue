<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="分类名"
          v-model="keyword"></el-input>
        <el-button size="mini" type="primary" @click="search">
          查询
        </el-button>
        <el-button class="btn-add" type="primary" @click="addCategory" size="mini">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="linkList" border>
        <el-table-column label="分类名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="分类描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="updateCategory(scope.row.id)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" @click="deleteHandle(scope.row.id)" size="mini">删除</el-button>
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
    <el-dialog title="isEdit?编辑分类:添加分类" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="formLabelWidth" prop="summary">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCategotyList,
    updateCategory,
    addCategory
  } from "@/api/category";
  const defaultQuery = {
    keyword: "",
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: "links",
    data() {
      return {
        listQuery: Object.assign({}, defaultQuery),
        linkList: [],
        total: null,
        listLoading: true,
        keyword: "",
        dialogVisible: false,
        isEdit: false,
        form: {
          name: "",
          description: ""
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取友情链接列表
      getList() {
        this.listLoading = true
        getCategotyList(this.listQuery).then(resp => {
          this.linkList = resp.data.list
          this.total = resp.data.total;
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
      // 编辑分类
      updateCategory(id) {
        
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
      // 添加分类
      addCategory() {
        
      },
      search() {
        this.listQuery.keyword = this.keyword
        this.getList()
      },
    },
  };
</script>

<style scoped>

</style>
