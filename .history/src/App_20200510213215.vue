<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量
      return {
        reload: this.reload
      }
    },
  }

</script>

<style>

</style>
