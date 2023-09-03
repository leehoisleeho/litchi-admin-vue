<script setup>
import {NDropdown,NIcon} from 'naive-ui'
import config from '../config.js'
import {useRouter} from "vue-router";
const router = useRouter();
const handleSelect = (e)=>{
  if (e===3){
    sessionStorage.clear()
    router.push("/")
  }
}
const options = [
  {
    label: "用户资料",
    key: 1,
  },
  {
    label: "修改密码",
    key: 2,
  },
  {
    label: "退出",
    key: 3,
  },
]
</script>

<template>
  <div class="container">
    <div class="logBox">
      <img src="../assets/img/logo.png">
      <h1>{{config.system_name}}</h1>
    </div>
    <div class="operateBox">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <div class="user">
          <img src="../assets/img/defaultUser.png">
        </div>
      </n-dropdown>
      <h2>
        <img src="../assets/img/versionIcon.png">
        <span>版本 {{config.version}}</span>
      </h2>
    </div>
  </div>
</template>

<style scoped>
.user>img{
  width: 100%;
  cursor: pointer;
}
.operateBox{
  display: flex;
}
.user{
  margin-right: 20px;
  border-radius: 50%;
  overflow: hidden;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.operateBox>h2>img{
  width: 22px;
  margin-right: 5px;
}
.operateBox>h2{
  font-weight: 400;
  font-size: 15px;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logBox>h1{
  font-size: 19px;
  margin-left: 10px;
  color: #333;
  font-weight: 380;
}
.logBox > img {
  width: 40px;
}

.operateBox {
  margin-right: 30px;
}

.logBox {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.container {
  min-width: 1200px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  border: 1px solid #f3f3f3;
}
</style>