<script setup>
import {ref} from 'vue'
</script>

<template>
  <div class="container">
    <div class="info">
      我是仪表盘
    </div>
  </div>
</template>

<style scoped>
.info{
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}
.container {
  height: calc(100vh - 80px);
  padding: 10px;
}
</style>