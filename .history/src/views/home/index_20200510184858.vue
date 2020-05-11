<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="home-info">
        <div>当前用户数 <span class="num">{{userCount}}</span></div>
        <div style="margin-left: 20px;">当前文章数 <span class="num">{{articleCount}}</span></div>
        <div style="margin-left: 20px;">当前标签数 <span class="num">{{tagCount}}</span></div>
      </div>
    </el-card>
    <div class="chart-wrapper">
      <PieChart v-if="showPieArticleCategoryChart" :value="articleCountByCategory" :tagName="articleCategoryNameArray">
      </PieChart>
    </div>
    <CalendarChart></CalendarChart>
  </div>
  <iframe id="myIframe" src="localhost:8080/swagger-ui.html" width="100%" height="780px;"></iframe>
  </div>
</template>

<script>
  import PieChart from "@/components/PieChart";
  import CalendarChart from "@/components/CalendarChart"
  import {
    getArticleCountByCategory
  } from '@/api/category'
  import {getUserCount} from '@/api/login'
  import {getArticleCount} from '@/api/article'
  import {getTagCount} from '@/api/tag'
  export default {
    name: 'home',
    components: {
      PieChart,
      CalendarChart
    },
    data() {
      return {
        userCount: 0,
        articleCount: 0,
        tagCount: 0,
        articleCountByCategory: [],
        articleCategoryNameArray: [],
        showPieArticleCategoryChart: false,

      }
    },
    created() {
      getUserCount().then(resp => {
        this.userCount = resp.data
      })
      getArticleCount().then(resp => {
        this.articleCount = resp.data
      })
      getArticleCountByCategory().then(resp => {
        this.articleCountByCategory = resp.data
        for (let i = 0; i < resp.data.length; i++) {
          this.articleCategoryNameArray.push(resp.data[i].name)
        }
        this.showPieArticleCategoryChart = true
      })
      getTagCount().then(resp => {
        this.tagCount = resp.data
      })
    },
    methods: {

    },
  }

</script>

<style>
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
    margin-top: 20px;
    border: 1px solid #dcdfe6;
  }

</style>
