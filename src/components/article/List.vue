<template>
  <div>
    <div class="search">
      <el-input
        placeholder="请输入文章名称"
        prefix-icon="el-icon-search"
        v-model="filterText">
      </el-input>
    </div>
    <div class="content">
      <el-table ref="multipleTable"
                border
                :data="articleList"
                v-loading="loading"
                tooltip-effect="dark"
                :row-style="{height:'50px'}"
                size="small"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="content" label="内容" align="center" show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.createTime|dateFormat}}</template>
        </el-table-column>
        <el-table-column label="是否发表" align="center">
          <template slot-scope="scope">
            <el-tag type="success">已发表</el-tag>
            <el-tag type="danger">未发表</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 10px">批量删除</el-button>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page.sync="query.pageNum"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        //文章列表
        articleList: [],
        query: {
          pageNum: 1, //当前页码
          pageSize: 5, //每页显示条数
        },
      }
    },
    mounted() {
      this.getArticleList(this.query);
    },
    methods: {
      //获取文章列表
      getArticleList(query) {
        this.loading = true;
        this.getRequest("article/list", query).then(resp => {
          this.loading = false;
          if (resp) {
            this.articleList = resp.data;
            this.totalCount = resp.page.total;
          }
        })
      },
      handleCurrentChange(val) {
        this.query.pageNum = val;
        this.getArticleList(this.query);
      },
      deleteBtn(data) {
        console.log(data);
        this.$confirm('是否删除数据',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {

        })
      },
    }
  }
</script>

<style scoped>
  .search {
    width: 300px;
  }

  .content {
    margin-top: 10px;
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
