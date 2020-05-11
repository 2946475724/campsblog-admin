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
                    <el-switch v-model="scope_child.row.hidden" active-color="#409eff" inactive-color="#C0CCDA"
                    :active-value="0" :inactive-value="1" @change="handleChange(scope_child.row.id, scope_child.row.hidden)">
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
              :active-value="0" :inactive-value="1" @change="handleChange(scope.row.id, scope.row.hidden)">
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
    getMenuList,
    fetchTreeList,
    updateHidden
  } from '@/api/menu'
  export default {
    name: 'menu',
    data() {
      return {
        listLoading: false,
        list: [],
        isHidden: 0
      }
    },
    created() {
      this.getMenuList();
    },
    methods: {
      // 获取菜单列表
      getMenuList() {
        this.listLoading = true;
        fetchTreeList().then(resp => {
          this.listLoading = false;
          this.list = resp.data
          this.total = resp.data.total;
        });
      },
      // 处理菜单显示与隐藏
      handleChange(id, hidden) {
        let data = {
          hidden: hidden
        }
        updateHidden(id, data).then(resp => {
          console.log(resp.msg)
        })
      },
      // handleStatusChange(index, row) {
      //   this.$confirm('是否要修改该状态?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     updateStatus(row.id, {
      //       status: row.status
      //     }).then(response => {
      //       this.$message({
      //         type: 'success',
      //         message: '修改成功!'
      //       });
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消修改'
      //     });
      //     this.getList();
      //   });
      // },
      // // 删除用户
      // handleDelete(index, row) {
      //   this.$confirm('是否要删除该用户?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     deleteUser(row.id).then(response => {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       });
      //       this.getList();
      //     });
      //   });
      // },


    }
  }

</script>
<style></style>
