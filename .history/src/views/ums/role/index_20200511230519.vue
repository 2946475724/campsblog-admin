<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input style="width: 203px; margin-right: 20px;" size="small" type="text" clearable placeholder="输入角色名"
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
              <el-button @click="allocateMenu(scope.$index, scope.row.id)" size="mini" type="text">分配菜单</el-button>
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
    <el-dialog title="分配菜单" :visible.sync="dialogVisible" width="40%">
      <el-tree :data="treeMenuList" ref="tree" default-expand-all show-checkbox node-key="id" :props="defaultProps">
      </el-tree>
      <div style="margin-top: 20px; margin-left: 75%">
        <el-button type="primary" size="mini" @click="handleSave()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRoleList,
    getMenuListByRoleId,
    allocMenu
  } from "@/api/role";
  import {
    getMenuList,
    fetchTreeList,
    updateHidden
  } from '@/api/menu'
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
        form: "",
        treeMenuList: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        roleId: null,
      }
    },
    created() {
      this.getList()
      this.getTreeMenuList()
    },
    methods: {
      // 获取角色列表
      getList() {
        this.listLoading = true
        getRoleList(this.listQuery).then(resp => {
          this.roleList = resp.data.list
          this.listQuery.pageNum = resp.data.pageNum
          this.listQuery.pageSize = resp.data.pageSize
          this.total = resp.data.total
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
      // 获取树形菜单
      getTreeMenuList() {
        fetchTreeList().then(resp => {
          this.treeMenuList = resp.data
        })
      },
      // 分配菜单
      allocateMenu(index, roleId) {
        this.dialogVisible = true
        this.roleId = roleId
        let checkedMenuIds = []
        getMenuListByRoleId(roleId).then(resp => {
          let menuList = resp.data
          if (menuList != null && menuList.length > 0) {
            for (let i = 0; i < menuList.length; i++) {
              if (menuList[i].parentId != 0) {
                checkedMenuIds.push(menuList[i].id)
              }
            }
          }
          this.$refs.tree.setCheckedKeys(checkedMenuIds)
        })
      },
      handleSave() {
        // let checkedNodes = this.$refs.tree.getCheckedNodes();
        // console.log(checkedNodes)
        // let checkedMenuIds = new Set()
        // if (checkedNodes != null && checkedNodes.length > 0) {
        //   for (let i = 0; i < checkedNodes.length; i++) {
        //     let checkedNode = checkedNodes[i]
        //     checkedMenuIds.add(checkedNode.id)
        //     if (checkedNode.parentId !== 0) {
        //       checkedMenuIds.add(checkedNode.parentId);
        //     }
        //     this.$confirm('是否分配菜单？', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       let params = new URLSearchParams();
        //       params.append("roleId", this.roleId);
        //       params.append("menuIds", Array.from(checkedMenuIds));
        //       allocMenu(params).then(response => {
        //         this.$message({
        //           message: '分配成功',
        //           type: 'success',
        //           duration: 1000
        //         });
        //       })
        //       this.dialogVisible = false
        //     })
        //   }
        // }
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
