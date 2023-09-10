<script setup>
import {NButton} from 'naive-ui'
import {ref, watch} from 'vue'
import api from '/API/api.js'
import config from "../config.js";

const props = defineProps(['src', 'imgSize', 'onlyRead'])
const emit = defineEmits(['update:src'])
const file = ref(props.src ? props.src : '')

// 监听file的变化 把旧的删除
watch(file, (newValue, oldValue) => {
  console.log(oldValue)
  if (oldValue) {
    api.remove({fileName: oldValue}).then(res => {
      console.log(res)
    })
  }
})
const update = () => {
  const inputImg = document.getElementById('inputImg')
  inputImg.click()
  inputImg.addEventListener('change', onchange)
}

const onchange = () => {
  const inputImg = document.getElementById('inputImg')
  inputImg.removeEventListener('change', onchange);
  api.upload(inputImg.files).then(res => {
    file.value = res.src
    emit('update:src', file.value)
    // 清空文件输入框的值
    inputImg.value = '';
  })
}
</script>

<template>
  <div v-if="file ===''" class="imgBox"
       :style="{ width:imgSize ? imgSize[0]+'px':100+'px',height:imgSize? imgSize[1]+'px':100+'px' }">
    <img src="/src/assets/img/imgOne.png">
  </div>
  <img :src="config.BASE_URL + file" :width="imgSize? imgSize[0]:100" :height="imgSize? imgSize[1]:100"
       v-if="file !==''">
  <div v-if="!onlyRead">
    <input type="file" id="inputImg" accept="image/png, image/jpeg" multiple="false">
    <n-button type="primary" v-show="file ===''" @click="update">选择图片</n-button>
    <n-button type="warning" v-show="file !==''" @click="update">更改图片</n-button>
  </div>
</template>

<style scoped>
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px dashed #c0c0c0; /* 2px宽度，黑色虚线 */
}

.imgBox > img {
  box-shadow: none;
  width: 30px;
  height: 30px;
  margin-bottom: 0px;
}

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