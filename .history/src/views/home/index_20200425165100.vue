<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="home-info">
        <div>当前用户数 <span class="num">120</span></div>
        <div style="margin-left: 20px;">当前文章数 <span class="num">120</span></div>
      </div>
    </el-card>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart ref="blogSortPie" @clickPie="clickBlogSortPie" v-if="showPieBlogSortChart"
            :value="blogCountByBlogSort" :tagName="blogSortNameArray"></pie-chart>
        </div>
      </el-col>
    </el-row>

  </div>
  </div>
</template>

<script>
  import PieChart from "@/components/PieChart";
  export default {
    name: 'home',
    components: {
      PieChart
    },
    data() {
      return {

      }
    },
    created() {
      this.initEchart()
    },
    methods: {

    }
  }

</script>

<style scoped>
  .home-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .home-info .num {
    font-size: 20px;
    font-weight: 700;
  }

</style>
