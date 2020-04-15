<<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-button type="primary" size="small" @click="handleSearchList()">
          查询结果
        </el-button>
        <el-button @click="handleResetSearch()" size="small">
          重置
        </el-button>
      </div>
      <div>
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" placeholder="文章标题"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="btn-add" @click="handleAddArticle()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
        <el-table 
            :data="list" 
            ref="" 
            style="width: 100%"
            border>
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="标题" align="center">
                <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="图片" align="center">
                <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
            <el-table-column label="作者" align="center">
                <template slot-scope="scope">{{scope.row.username}}</template>
            </el-table-column>
            <el-table-column label="文章类型" align="center">
                <template slot-scope="scope">{{scope.row.cateName}}</template>
            </el-table-column>
            <el-table-column label="发布时间" align="center">
                <template slot-scope="scope">{{scope.row.createTime | dateFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <p>
                        <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </p>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="batch-operate-container">
        <el-select size="small" v-model="operateType" placeholder="批量操作">
            <el-option v-for="item in operates" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-button style="margin-left: 20px" class="search-button" @click="handleBatchOperate()" type="primary"
            size="small">
            确定
        </el-button>
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
import { fetchList } from "@/api/article";
const defaultQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
};
export default {
    name: "articleList",
    data() {
        return {
            operateType: null,
            listQuery: Object.assign({}, defaultQuery),
            list: null,
            total: null,
            listLoading: true,
           
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true,
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            })
        },
        handleAddArticle() {
          this.$router.push({path:'/ams/addArticle'});
        },
    },
};
</script>

<style scoped></style>
