<template>
  <div class="app-container" id="app-container">
    <iframe id="myIframe" :src="swaggerUrl" width="100%" height="780px;"></iframe>
  </div>
</template>

<script>
  export default {
    name: "swagger",
    data() {
      return {
        swaggerUrl: 'http://localhost:8080/swagger-ui.html'
      }
    },
    created() {},
    methods: {

    },
  };

</script>

<style scoped>

</style>
