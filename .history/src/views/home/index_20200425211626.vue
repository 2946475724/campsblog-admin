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
          <PieChart v-if="showPieArticleCategoryChart" :value="articleCountByCategory" :tagName="articleCategoryNameArray">
          </PieChart>
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
        articleCountByCategory: [],
        articleCategoryNameArray: [],
        showPieArticleCategoryChart: false,
      }
    },
    created() {
      getArticleCountByCategory().then(resp => {
        console.log(resp)

        this.articleCountByCategory = resp.data
        for (let i = 0; i < resp.data.length; i++) {
          // this.articleCountByCategory.push(resp.data[i].articleCount)
          this.articleCategoryNameArray.push(resp.data[i].name)
        }
        console.log(this.articleCategoryNameArray)
        this.showPieArticleCategoryChart = true
      })
    },
    methods: {

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
    background: #eee;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

</style>
