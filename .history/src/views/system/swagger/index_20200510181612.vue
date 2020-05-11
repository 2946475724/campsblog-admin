<template>
  <div class="app-container">
    接口文档
  </div>
</template>

<script>
  import {getSwagger} from '@/api/article'
  export default {
    name: "swagger",
    data() {
      return {
    
      }
    },
    created() {
      this.getSwagger();
    },
    methods: {
      getSwagger() {
        getSwagger().then(resp => {

        })
      }
    },
  };
</script>

<style scoped>

</style>
