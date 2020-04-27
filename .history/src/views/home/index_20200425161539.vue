<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="home-info">
        <div>当前用户数 <span class="num">120</span></div>
        <div>当前文章数 <></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        
      }
    },
    created(){
      
    },
  }
</script>

<style scoped>
  .home-info {
    display: flex;
    flex-direction: row;
  }
  .home-info .num {
    font-size: 20px;
    font-weight: 700;
  }
</style>
