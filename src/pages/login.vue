<script setup>
import {ref, onBeforeUnmount} from "vue";
import config from "../config.js";
import {NInput, NButton, NIcon, useMessage} from 'naive-ui'
import {PersonSharp, LockClosed} from '@vicons/ionicons5'
import {useLoadingStore} from '/store/index.js'

const store = useLoadingStore()
import api from '/API/api.js'
import {useRouter} from 'vue-router';

const router = useRouter();
const username = ref('')
const password = ref('')

const message = useMessage()


const toIndex = () => {
  store.set(true)
  api.login({
    username: username.value,
    password: password.value
  }).then(res => {
    if (res.code === 0) {
      sessionStorage.setItem('token',res.token)
      router.push('/index')
      message.success(res.msg)
      store.set(false)
    } else if (res.code === 1) {
      message.error(res.msg)
      store.set(false)
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="loginBox">
      <div class="loginBox_1">
        <div class="imgBox">
          <img src="../assets/img/logo.png">
        </div>
        <h1>{{ config.system_name }}</h1>
        <div class="version">
          <img src="../assets/img/versionIcon.png">
          <p>版本号 v 0.0.2</p>
        </div>
        <div class="foot">
          {{ config.footer }}
        </div>
      </div>
      <div class="loginBox_2">
        <h2>登录 Login</h2>
        <n-input placeholder="账号" style="margin-top: 40px" v-model:value="username">
          <template #prefix>
            <n-icon :component="PersonSharp"/>
          </template>
        </n-input>
        <n-input placeholder="密码" type="password" show-password-on="mousedown" style="margin-top: 20px"
                 v-model:value="password" @keydown.enter="toIndex">
          <template #prefix>
            <n-icon :component="LockClosed" />
          </template>
        </n-input>
        <n-button type="primary" block style="margin-top: 20px" @click="toIndex" @keydown.enter="toIndex">
          登录
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loginBox {
  margin-top: 25vh;
}

.loginBox_2 > h2 {
  color: #333333;
}

.imgBox {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50%;
}

.imgBox > img {
  width: 60%;
}

.version > img {
  width: 15px;
}

.version > p {
  font-size: 12px;
  margin-left: 5px;
  color: #999;
}

.version {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.loginBox_1 > h1 {
  font-weight: 350;
  font-size: 22px;
  margin-top: 20px;
  color: #444444;
  width: 100%;
  text-align: center;
}

.loginBox_1 > .foot {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  color: #999999;
}

.loginBox_2 {
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 0 90px;
  align-items: center;
  justify-content: center;
}

.loginBox_1 {
  width: 350px;
  border-right: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.container {
  min-width: 1200px;
  display: flex;
  justify-content: center;
  background: url("../assets/img/bg.png");
}

.loginBox {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 800px;
  height: 430px;
  border-radius: 10px;
  display: flex;
  background: white;
}
</style>