<template>
  <div class="app-container" id="app-container">
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
          document.getElementById("app-container").innerHTML = resp;
        })
      }
    },
  };
</script>

<style scoped>

</style>
