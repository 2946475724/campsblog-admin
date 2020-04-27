<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="home-info">
        <div>当前用户数 <span class="num">120</span></div>
        <div style="margin-left: 20px;">当前文章数 <span class="num">120</span></div>
      </div>
    </el-card>
    <div id="pieChart" class="chart-container">

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'home',
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
