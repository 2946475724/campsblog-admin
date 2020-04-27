<template>
  <div class="app-container">
    <div class="home-info">
      <div>当前用户数</div>
      <div>当前文章数</div>
    </div>
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
    margin: 10px 20px;
  }
</style>
