<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部文章" name="list"><List></List></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import List from '../../components/article/List';
  export default {
    name: "ArticleList",
    data() {
      return {
        activeName: 'list',
      }
    },
    components: {
      List,
    }
  }
</script>

<style scoped>

</style>
