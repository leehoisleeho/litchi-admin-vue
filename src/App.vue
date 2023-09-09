<script setup>
import {onMounted} from "vue";
import {NMessageProvider,NSpin} from 'naive-ui'
import {useLoadingStore} from '/store/index.js'
const store = useLoadingStore()
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
.loading>p{
  color: #666666;
  font-size: 16px;
  margin-top: 15px;
}
.container {
  min-width: 1440px;
  height: 100vh;
}
</style>
