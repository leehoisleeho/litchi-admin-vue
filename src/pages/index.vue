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
    label: '新闻',
    key: 1,
    link: '/news'
  },
  {
    label: '公司资质',
    key: 2,
    link: '/qualification'
  },
  {
    label: '公司视频',
    key: 3,
    link: '/video'
  },
  {
    label: '产品列表',
    key: 4,
    link: '/product'
  },
  {
    label: '关于我们',
    key: 5,
    link: '/about'
  },
  {
    label: '轮播图',
    key: 6,
    link: '/banner'
  },
]
const route = useRoute()
let info = menuOptions.filter(item => {
  return item.link === route.path
})
store.setNav(info[0].key, info[0].link)
</script>

<template>
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