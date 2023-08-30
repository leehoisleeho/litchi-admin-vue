<script setup>
import {NMenu} from 'naive-ui'
import Header from "./header.vue";
import {useRouter} from 'vue-router';
import {useNavigationStore} from '../../store/index.js'

const router = useRouter();
const store = useNavigationStore()

const navInfo = JSON.parse(localStorage.getItem('navInfo'))
if (navInfo) {
  store.setNav(navInfo.value, navInfo.path)
}

// 定义侧边导航栏
const menuOptions = [
  {
    label: '首页',
    key: '0',
    link: '/dashboard'
  },
  {
    label: '基础页面-1',
    key: '1',
    link: '/baseTemplate'
  },
]
// 切换导航
const handleUpdateValue = (e) => {
  const path = menuOptions[e].link
  router.push(path)
  // 将导航状态保存到本地存储
  localStorage.setItem('navInfo', JSON.stringify({
    value: String(e),
    path: path,
  }))
}
</script>

<template>
  <Header/>
  <div class="container">
    <div class="side">
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" :default-value="String(store.value)"/>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
}

.main {
  width: calc(100vw - 234px);
}

.side {
  height: calc(100vh - 80px);
  border: 1px solid #f3f3f3;
  width: 240px;
  padding: 10px 0;
}
</style>