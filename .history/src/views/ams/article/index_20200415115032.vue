<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" placeholder="文章标题"></el-input>
        <el-button size="mini" @click="handleSearchList()">
          查询
        </el-button>
        <el-button class="btn-add" type="primary" @click="addArticle()" size="mini">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="articleList" ref="" style="width: 100%" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.coverImage" style="width: 100px; height: 50px;"/></template>
        </el-table-column>
        <el-table-column label="作者" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="文章分类" align="center">
          <template slot-scope="scope">{{scope.row.categoryName}}</template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="是否发布" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="updateArticle(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" @click="deleteArticle(scope.row.id)" size="mini">删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
        size="mini">
        确定
      </el-button>
    </div> -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getArticleList,
    deleteArticleById
  } from "@/api/article";
  const defaultQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: "articleList",
    data() {
      return {
        listQuery: Object.assign({}, defaultQuery),
        articleList: null,
        total: null,
        listLoading: true,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取文章列表
      getList() {
        this.listLoading = true,
        getArticleList(this.listQuery).then(response => {
          this.listLoading = false;
          this.articleList = response.data.list;
          this.total = response.data.total;
        })
      },
      // 点击当前页
      handleCurrentChange(value) {
        this.pageNum = value;
        this.getList()
      },
      // 每页条数的改变
      handleSizeChange(value) {

      },
      // 修改文章
      updateArticle() {

      },
      // 删除文章
      deleteArticle(value) {
        let params = {
          id: value
        }
        this.$confirm("确认删除吗？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$message({
            type: 'success',
            message: '删除成功!'
           });
        }).catch(() => this.$message({
          type: 'info',
          message: '已取消删除'
        })
        // deleteArticleById(params).then(resp => {
        //   if (resp.code === 200) {
            
        //   }

        // })
      },
      // 添加文章
      addArticle() {
        this.$router.push({
          path: '/ams/addArticle'
        });
      },
    },
  };

</script>

<style scoped>

</style>
