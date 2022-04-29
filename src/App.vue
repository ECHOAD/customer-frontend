<template>
  <div id="app">
    <Customers/>
  </div>
</template>

<script>
import Customers from "./components/Customers.vue";

export default {
  name: 'App',
  components: {
    Customers
  }
}
</script>

<style>
#app {

  margin-top: 60px;
}
</style>
