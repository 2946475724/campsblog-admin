<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="文章标题"
          v-model="keyword"></el-input>
        <el-button type="primary" size="mini" @click="search">
          查询
        </el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table :data="sysLogList" border>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="请求接口" align="center">
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
        <el-table-column label="请求方式" align="center">
          <template slot-scope="scope">{{scope.row.type}}</template>
        </el-table-column>
        <el-table-column label="接口名" align="center">
          <template slot-scope="scope">{{scope.row.operation}}</template>
        </el-table-column>
        <el-table-column label="ip地址" align="center">
          <template slot-scope="scope">{{scope.row.ip}}</template>
        </el-table-column>
        <el-table-column label="请求耗时" align="center">
          <template slot-scope="scope">{{scope.row.spendTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
        </el-table-column>
      </el-table>
    </div>
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
    getSysLogList
  } from "@/api/log";
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
        sysLogList: [],
        total: null,
        listLoading: true,
        keyword: "",
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 获取友情链接列表
      getList() {
        this.listLoading = true
        getSysLogList().then(resp => {
          this.sysLogList = resp.data
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
      search() {
        this.listQuery.keyword = this.keyword
        this.getList()
      },
    },
  };
</script>

<style scoped>

</style>
