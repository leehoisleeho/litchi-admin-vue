<script setup>
import {onMounted} from "vue";
import {NMessageProvider} from 'naive-ui'
onMounted(() => {
  console.log('🐰 Litchi start')
})
</script>

<template>
  <n-message-provider>
    <div class="container">
      <router-view></router-view>
    </div>
  </n-message-provider>

</template>

<style scoped>
.container {
  min-width: 1200px;
  height: 100vh;
}
</style>
