<script setup>
import {NButton} from 'naive-ui'
import {ref, watch} from 'vue'
import api from '/API/api.js'
const fileList = ref([])
const update = () => {
  const inputImg = document.getElementById('_inputImg')
  inputImg.click()
  inputImg.addEventListener('change', handleFileChange)
}
const handleFileChange = () => {
  const inputImg = document.getElementById('_inputImg')
  api.update(inputImg.files).then(res => {
    console.log(res.data.full_url)
    fileList.value.push(res.data.full_url)
    // 清空文件输入框的值
    inputImg.value = '';
  })
}
const remove = (index)=>{
  fileList.value.splice(index,1)
}

// 自定义事件
const emit = defineEmits(['change'])
// 监听
watch(fileList.value,(value)=>{
  emit('change',fileList.value)
})
</script>

<template>
  <div class="box">
    <div class="inputBox">
      <input type="file" id="_inputImg" accept="image/png, image/jpeg" multiple="false">
      <n-button type="primary" @click="update">上传图片</n-button>
    </div>
    <div class="list">
      <p v-show="fileList.length===0">暂无图片</p>
      <div class="imgBox" v-for="(item,index) in fileList" v-show="fileList.length!==0">
        <img :src="item" >
        <img src="/src/assets/img/remove.png" alt="" class="remove" @click="remove(index)">
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgBox{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imgBox >.remove{
  width: 20px !important;
  margin-top: 10px;
  cursor: pointer;
}
.list {
  display: flex;
  align-items: center;
}

.imgBox > img {
  width: 200px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-right: 30px;
}

#_inputImg {
  width: 0;
}

.inputBox {

}
.list{
  margin-top: 15px;
}
.list > p {
  color: #999999;
}
</style>