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
          <pie-chart ref="articleSortPie" @clickPie="clickArticleSortPie" v-if="showPieArticleSortChart"
            :value="articleCountByBlogSort" :tagName="articleSortNameArray"></pie-chart>
        </div>
      </el-col>
    </el-row>

  </div>
  </div>
</template>

<script>
  import PieChart from "@/components/PieChart";
  import {
    getArticleCountByCategory
  } from '@/api/category'
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
      this.getArticleCountByCategory()
    },
    methods: {
      getArticleCountByCategory() {
        getArticleCountByCategory().then(resp => {
          console.log(resp)
        })
      }
    },
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

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

</style>
