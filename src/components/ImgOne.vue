<script setup>
import {NButton} from 'naive-ui'
import {ref} from 'vue'
import api from '/API/api.js'

const props = defineProps(['src','imgSize','onlyRead'])
const emit = defineEmits(['update:src'])
const file = ref(props.src)

const update = () => {
  const inputImg = document.getElementById('inputImg')
  inputImg.click()
  inputImg.addEventListener('change', xxx)
}

const xxx = () => {
  const inputImg = document.getElementById('inputImg')
  inputImg.removeEventListener('change', xxx);
  api.update(inputImg.files).then(res => {
    const newFile = res.data.full_url
    file.value = newFile
    emit('update:src', newFile)
    // 清空文件输入框的值
    inputImg.value = '';
  })
}
</script>

<template>
  <img :src="file" :width="imgSize? imgSize[0]:100" :height="imgSize? imgSize[1]:100" v-show="file !==''">
  <div v-if="!onlyRead">
    <input type="file" id="inputImg" accept="image/png, image/jpeg" multiple="false">
    <n-button type="primary" v-show="file ===''" @click="update" >提交图片</n-button>
    <n-button type="warning" v-show="file !==''" @click="update" >更改图片</n-button>
  </div>
</template>

<style scoped>
img {
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

#inputImg {
  width: 0;
  height: 0;
}
</style>