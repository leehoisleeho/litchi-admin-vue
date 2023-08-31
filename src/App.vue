<script setup>
import Index from "./pages/index.vue";
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .container{
    min-width: 1200px;
    height: 100vh;
  }
</style>
