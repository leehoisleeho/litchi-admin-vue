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
      <div class="loading" v-show="store.show">
        <n-spin size="medium"/>
<!--        <p>加载中</p>-->
      </div>
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
.loading{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: absolute;
  padding: 20px 0;
}
.container {
  min-width: 1200px;
  height: 100vh;
}
</style>
