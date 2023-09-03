<script setup>
import {onMounted, reactive, ref} from 'vue'
import Editor from "../components/Editor.vue"
import {NButton, NDivider, NPagination, NPopconfirm, NDrawer, NDrawerContent, NInput, useMessage} from 'naive-ui'
import ImgOne from "../components/ImgOne.vue";
import api from '/API/api.js'

const isShow = ref(false)
onMounted(() => {
  api.getAbout().then(res => {
    isShow.value = true
    let data = res.data[0]
    content.value = data.content
    src_cover.value = data.src_cover
    address.value = data.address
    name.value = data.name
    phone.value = data.phone
    coordinate.value = data.coordinate
    src_map.value = data.src_map
    src_wx.value = data.src_wx
  })
})


const onlyRead = ref(true)
// 关于我们所有数据
const content = ref('')
const src_cover = ref('')
const address = ref('')
const name = ref('')
const phone = ref('')
// 公司坐标
const coordinate = ref('')
const src_map = ref('')
const src_wx = ref('')

const editBtn = () => {
  onlyRead.value = false
}
const submit = () => {
  api.editAbout({
    id: 1,
    content: content.value,
    src_cover: src_cover.value,
    address: address.value,
    name: name.value,
    phone: phone.value,
    coordinate: coordinate.value,
    src_map: src_map.value,
    src_wx: src_wx.value
  }).then(res => {
    onlyRead.value = true
  })
}

// 富文本自定义事件
const EditorChange = (val) => {
  content.value = val
}
// 图片改变回调
const coveOnchange = (val) => {
  console.log(val)
  src_cover.value = val
}
const mapOnchange = (val) => {
  src_map.value = val
}
const wxOnchange = (val) => {
  src_wx.value = val
}
</script>

<template>
  <div class="container">
    <div class="info" v-if="isShow">
      <p>
        <span style="margin-right: 20px">关于我们</span>
        <n-button type="info" v-show="onlyRead" @click="editBtn">编辑</n-button>
        <n-button type="primary" v-show="!onlyRead" @click="submit">提交</n-button>
      </p>
      <div class="inputBox imgbox">
        <p>封面</p>
        <img :src="src_cover" alt="" style="width: 200px; height:113px; margin-bottom: 10px">
        <div v-show="!onlyRead">
          <ImgOne :src="src_cover" @change="coveOnchange"></ImgOne>
        </div>
      </div>
      <div class="editBox">
        <Editor @change="EditorChange" :content=content></Editor>
      </div>
      <div class="inputBox">
        <p>联系方式</p>
        <n-input type="text" placeholder="公司名称" v-model:value="name" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="联系方式" v-model:value="phone" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="公司地址" v-model:value="address" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="公司坐标" v-model:value="coordinate" :disabled="onlyRead"></n-input>
      </div>
      <div class="inputBox">
        <p>二维码</p>
        <div class="erweimaBox">
          <div class="imgbox">
            <img :src="src_map" alt="" style="width: 200px; height: 200px; margin-bottom: 10px">
            <div v-show="!onlyRead">
              <ImgOne :src="src_map" @change="mapOnchange"></ImgOne>
            </div>
          </div>
          <div class="imgbox">
            <img :src="src_wx" alt="" style="width: 200px; height: 200px; margin-bottom: 10px">
            <div v-show="!onlyRead">
              <ImgOne :src="src_wx" @change="wxOnchange"></ImgOne>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.imgbox {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.erweimaBox > div {
  margin-right: 20px;
}

.erweimaBox {
  display: flex;
}

.inputBox > .n-input {
  margin-bottom: 20px;
}

.inputBox > p {
  font-size: 16px;
  margin-bottom: 10px;
}

.inputBox {
  margin-top: 20px;
}

.editBox {
  margin-top: 20px;
}

.info > p {
  font-size: 20px;
}

.info {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: auto;
}

.container {
  height: calc(100vh - 80px);
  padding: 20px;
}
</style>