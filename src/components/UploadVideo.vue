<script setup>
import {NButton} from 'naive-ui'
import {ref, watch} from "vue";
import api from "../../API/api.js";

const props = defineProps(['src'])
const file = ref(props.src)

const emit = defineEmits(['change'])
watch(file, (val) => {
  emit('change', val)
})

const update = () => {
  const _videoInput = document.getElementById('_videoInput')
  _videoInput.click()
  _videoInput.addEventListener('change', handleFileChange)
}
const handleFileChange = () => {
  const _videoInput = document.getElementById('_videoInput')
  api.update(_videoInput.files).then(res => {
    console.log(res)
    file.value = res.data.full_url
    // 清空文件输入框的值
    _videoInput.value = '';
  })
}
</script>

<template>
  <div class="videoBox">
    <input type="file" id="_videoInput" multiple="false" accept="video/*">
    <n-button type="primary" v-show="file===''" @click="update">上传视频</n-button>
    <n-button type="warning" v-show="file!==''" @click="update">更改视频</n-button>
  </div>
</template>

<style scoped>
#_videoInput {
  width: 0;
  height: 0;
}
</style>