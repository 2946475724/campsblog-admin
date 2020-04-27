<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" placeholder="文章标题"></el-input>
        <el-button size="mini" >
          查询
        </el-button>
        <el-button class="btn-add" type="primary"  size="mini">
          添加
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="linkList" ref="" style="width: 100%" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="友链名" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="友链简介" align="center">
          <template slot-scope="scope">
            <template slot-scope="scope">{{scope.row.summary}}</template>
        </el-table-column>
        <el-table-column label="友链url" align="center">
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button @click="updateArticle(scope.row.id)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" @click="deleteArticle(scope.row.id)" size="mini">删除</el-button>
            </p>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum" :total="total">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
  import {getLinkList} from "@/api/link";
  // const defaultQuery = {
  //   keyword: null,
  //   pageNum: 1,
  //   pageSize: 5,
  // };
  export default {
    name: "link",
    data() {
      return {
        // listQuery: Object.assign({}, defaultQuery),
        linkList: [],
        // total: null,
        // listLoading: true,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取友情链接列表
      getList() {
        getLinkList().then(resp => {
          console.log(resp.data)
          this.linkList = resp.data
        })
      },
      // // 点击当前页
      // handleCurrentChange(value) {
      //   this.pageNum = value;
      //   this.getList()
      // },
      // // 每页条数的改变
      // handleSizeChange(value) {

      // },
      // // 修改文章
      // updateArticle(id) {
      //   console.log(id)
      //   this.$router.push({
      //     path: '/ams/updateArticle',
      //     query: {
      //       id: id
      //     }
      //   })
      // },
      // // 删除文章
      // deleteArticle(value) {
      //   let params = {
      //     id: value
      //   }
      //   this.$confirm("确认删除吗？", '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     deleteArticleById(params).then(resp => {
      //       if (resp.code === 200) {
      //         this.getList()
      //         this.$message({
      //           type: 'success',
      //           message: '删除成功!'
      //         });
      //       }
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     })
      //   })
      // },
      // // 添加文章
      // addArticle() {
      //   this.$router.push({
      //     path: '/ams/addArticle'
      //   });
      // },
    },
  };

</script>

<style scoped>

</style>
