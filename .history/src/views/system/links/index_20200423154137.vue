<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="文章标题"
          v-model="keyword"></el-input>
        <el-button size="mini" @click="handleSearch">
          查询
        </el-button>
        <el-button class="btn-add" type="primary" size="mini" @click="handleAdd">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="linkList" border>
        <el-table-column label="友链名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="友链简介" align="center">
          <template slot-scope="scope">{{scope.row.summary}}</template>
        </el-table-column>
        <el-table-column label="友链url" align="center">
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="handleUpdate(scope.row)" type="primary" size="mini">编辑</el-button>
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

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="友链名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="友链简介" :label-width="formLabelWidth" prop="summary">
          <el-input v-model="form.summary" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="友链URL" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" auto-complete="off"></el-input>
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
    getLinkList,
    deleteLinkById,
    addLink
  } from "@/api/link";
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
        dialogFormVisible: false, // 控制弹出框
        formLabelWidth: '120px',
        title: '添加友链',
        isEdit: false,
        form: {
          id: "",
          title: "",
          summary: "",
          url: "",
        },
        rules: {
          title: [{required: true, message: '友链名称不能为空', trigger: 'blur'}],
          summary: [{required: true, message: '友链简介不能为空', trigger: 'blur'}],
          url: [{required: true, message: '友链地址不能为空', trigger: 'blur'}]
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
        getLinkList(this.listQuery).then(resp => {
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
      // 编辑友链
      handleUpdate(row) {
        this.title = '编辑友链'
        this.dialogFormVisible = true
        this.isEdit = true
        console.log(row)
        this.form = row
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
      // 添加友链
      handleAdd() {
        this.title = "添加友链"
        this.dialogFormVisible = true
        this.isEdit = false
      },
      handleSearch() {
        this.listQuery.keyword = this.keyword
        this.getList()
      },
      // 提交添加或编辑
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              editLink(this.form).then(resp => {
                console.log(resp);
                if (resp.code === 200) {
                  this.$message({
                    type: "success",
                    message: resp.data
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message({
                    type: "success",
                    message: resp.data
                  });
                }
              });
            } else {
              addLink(this.form).then(resp => {
                console.log(resp);
                if (resp.code == 200) {
                  this.$message({
                    type: "success",
                    message: resp.data
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message({
                    type: "error",
                    message: resp.data
                  });
                }
              });
            }
          } else {
            console.log("没有通过校验");
            return false;
          }
        });

      }
    },
  };

</script>

<style scoped>

</style>
