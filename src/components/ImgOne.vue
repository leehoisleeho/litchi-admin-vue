<script setup>
import {NButton} from 'naive-ui'
import {ref} from 'vue'
import api from '/API/api.js'

const props = defineProps(['src'])
const file = ref(props.src)
const emit = defineEmits(['change'])

const update = () => {
  const inputImg = document.getElementById('inputImg')
  inputImg.click()
  inputImg.addEventListener('change', handleFileChange)
}
const handleFileChange = () => {
  const inputImg = document.getElementById('inputImg')
  api.update(inputImg.files).then(res => {
    file.value = res.data.full_url
    emit('change', res.data.full_url)
    // 清空文件输入框的值
    inputImg.value = '';
  })
}
</script>

<template>
  <input type="file" id="inputImg" accept="image/png, image/jpeg" multiple="false">
  <n-button type="primary" v-show="file ===''" @click="update">提交图片</n-button>
  <n-button type="warning" v-show="file !==''" @click="update">更改图片</n-button>
</template>

<style scoped>
#inputImg {
  width: 0px;
  height: 0px;
}
</style>