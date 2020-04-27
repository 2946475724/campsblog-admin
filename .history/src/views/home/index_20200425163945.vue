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
    created(){
      this.initEchart()
    },
    methods: {
      initEchart() {
        axios.get('/echart').then((res) => {
        let echartData = res.data;
        this.$nextTick(() => {
        let pieEchart = document.getElementById('pieChart');
        let pieEcharts = Echarts.init(pieEchart);
        let option = { }
        pieEcharts.setOption(option)
        // 如果需要点击圆环触发事件
        pieEcharts.on('click', function(param) {
        let typeName = param.name
        switch (typeName) {
        case '男':
        location.href = `gender?sex=1`
        break
        case '女':
        location.href = `gender?sex=2`
        break
        });
        })
        }).catch((error) => {
        console.log(error);
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
</style>
