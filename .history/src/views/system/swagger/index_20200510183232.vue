<template>
  <div class="app-container" id="app-container">
    <iframe id="myIframe" :src="swaggerUrl" width="100%" height="780px;"></iframe>
  </div>
</template>

<script>
  import {getSwagger} from '@/api/article'
  export default {
    name: "swagger",
    data() {
      return {
    swaggerUrl: 'http://localhost:8080/swagger-ui.html'
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
