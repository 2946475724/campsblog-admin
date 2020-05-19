<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="标签名"
          v-model="keyword"></el-input>
        <el-button size="mini" type="primary" @click="handleSearch">
          查询
        </el-button>
        <el-button class="btn-add" type="primary" @click="addTag" size="mini">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="tagList" border>
        <el-table-column label="标签名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="点击量" align="center">
          <template slot-scope="scope">{{scope.row.clickCount}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status === 0 ? '正常' : '隐藏'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="updateTag(scope.row)" type="primary" size="mini">编辑</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" :label-width="formLabelWidth" prop="summary">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getTagList
  } from "@/api/tag";
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
        tagList: [],
        total: null,
        listLoading: true,
        keyword: "",
        dialogVisible: false,
        dialogTitle: "",
        isEdit: false,
        form: {
          id: "",
          name: "",
          status: ""
        },
        rules: {
          name: [{
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取标签列表
      getList() {
        this.listLoading = true
        getTagList(this.listQuery).then(resp => {
          this.tagList = resp.data.list
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
      // 编辑标签
      updateTag(value) {
        this.dialogVisible = true
        this.dialogTitle = "编辑标签"
        this.isEdit = true
        this.form.id = value.id
        this.form.name = value.name
        this.form.status = value.status
      },
      // 删除标签
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
      // 添加标签
      addTag() {
        this.dialogVisible = true
        this.dialogTitle = "添加分类"
        this.isEdit = false
      },
      handleSearch() {
        this.listQuery.keyword = this.keyword
        this.getList()
      },
    },
  };

</script>

<style scoped>

</style>
