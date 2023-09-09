<script setup>
import {NMenu} from 'naive-ui'
import Header from "./header.vue";
import {useRouter, useRoute} from 'vue-router';
import {useNavigationStore} from '../../store/index.js'
import config from "../config.js";
const router = useRouter();
const store = useNavigationStore()
// 切换导航
const handleUpdateValue = (e) => {
  const path = menuOptions[e].link
  router.push(path)
}
// 定义侧边导航栏
const menuOptions = [
  {
    label: '首页',
    key: 0,
    link: '/dashboard'
  },
  {
    label: '基础页面',
    key: 1,
    link: '/table'
  },
  {
    label: '基础页面 Plus',
    key: 2,
    link: '/tablePlus'
  },
]
const route = useRoute()
let info = menuOptions.filter(item => {
  return item.link === route.path
})
store.setNav(info[0].key, info[0].link)
</script>

<template>
  <div class="BOX">
    <Header/>
    <div class="container">
      <div class="side">
        <n-menu :options="menuOptions" @update:value="handleUpdateValue" :default-value="store.value"/>
        <div class="foot">{{ config.footer }}</div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.BOX{
  min-width: 1440px;
}
.container {
  position: relative;
  display: flex;
  width: 100%;
}

.main {
  width: 100%;
}

.side {
  height: calc(100vh - 80px);
  border: 1px solid #f3f3f3;
  width: 240px;
  padding: 10px 0;
  position: relative;
}

.side > .foot {
  position: absolute;
  bottom: 10px;
  width: 100%;
  color: #999999;
  font-size: 12px;
  text-align: center;
  padding: 0 10px;
}
</style>