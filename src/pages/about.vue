<script setup>
import {onMounted, ref} from 'vue'
import Editor from "../components/Editor.vue"
import ImgOne from "../components/ImgOne.vue";
import {
  NButton,
  NUpload,
  NDivider,
  NPagination,
  NPopconfirm,
  NDrawer,
  NDrawerContent,
  NInput,
  useMessage
} from 'naive-ui'
import api from '/API/api.js'

const isShow = ref(false)
const onlyRead = ref(true)

onMounted(() => {
  api.getAbout().then(res => {
    isShow.value = true
    let data = res.data[0]
    content.value = data.content
    address.value = data.address
    name.value = data.name
    phone.value = data.phone
    // 坐标
    coordinate.value = data.coordinate
    // 图片的值
    src_cover.value = data.src_cover
    src_map.value = data.src_map
    src_wx.value = data.src_wx
  })
})

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
const xxx = ref(0)
const inputImg = (e) => {
  xxx.value = e
  const imgInput = document.getElementById('imgInput')
  imgInput.removeEventListener('change', hand);
  imgInput.click()
  imgInput.addEventListener('change', hand)
}
const hand = ()=>{
  const imgInput = document.getElementById('imgInput')
  api.update(imgInput.files).then(res => {
    const newFile = res.data.full_url
    console.log('当前的e'+ xxx.value)
    if (xxx.value === 1) {
      console.log('我在改背景')
      src_cover.value = newFile
    } else if (xxx.value === 2) {
      console.log('我在改地图')
      src_map.value = newFile
    } else if (xxx.value === 3) {
      console.log('我在改wx')
      src_wx.value = newFile
    }
    // 清空文件输入框的值
    inputImg.value = '';
  })
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
      <div class="imgBox">
        <div class="imgBoxItem">
          <p>封面</p>
          <ImgOne v-model:src="src_cover" :imgSize="[200,112]" :onlyRead="onlyRead"></ImgOne>
<!--          <img :src="src_cover" alt="" width="200" height="112">-->
<!--          <div class="imgUpdate">-->
<!--            <input type="file" id="imgInput">-->
<!--            <n-button type="primary" v-if="src_cover===''">上传图片</n-button>-->
<!--            <n-button type="warning" v-if="src_cover!==''" @click="inputImg(1)">更改图片</n-button>-->
<!--          </div>-->
        </div>
        <div class="imgBoxItem">
          <p>地图</p>
          <ImgOne v-model:src="src_map" :onlyRead="onlyRead"></ImgOne>
<!--          <img :src="src_map" alt="" width="112" height="112">-->

<!--          <div class="imgUpdate">-->
<!--            <input type="file" id="imgInput">-->
<!--            <n-button type="primary" v-if="src_map===''">上传图片</n-button>-->
<!--            <n-button type="warning" v-if="src_map!==''" @click="inputImg(2)">更改图片</n-button>-->
<!--          </div>-->
        </div>
        <div class="imgBoxItem">
          <p>联系我们</p>
          <ImgOne v-model:src="src_wx" :onlyRead="onlyRead"></ImgOne>
<!--          <img :src="src_wx" alt="" width="112" height="112">-->
<!--          <div class="imgUpdate">-->
<!--            <input type="file" id="imgInput">-->
<!--            <n-button type="primary" v-if="src_wx===''">上传图片</n-button>-->
<!--            <n-button type="warning" v-if="src_wx!==''" @click="inputImg(3)">更改图片</n-button>-->
<!--          </div>-->
        </div>
      </div>
      <div v-html="content" class="editInfo" v-show="onlyRead"></div>
      <div class="editBox">
        <Editor @change="EditorChange" :content=content v-if="!onlyRead"></Editor>
      </div>
      <div class="inputBox">
        <p>联系方式</p>
        <n-input type="text" placeholder="公司名称" v-model:value="name" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="联系方式" v-model:value="phone" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="公司地址" v-model:value="address" :disabled="onlyRead"></n-input>
        <n-input type="text" placeholder="公司坐标" v-model:value="coordinate" :disabled="onlyRead"></n-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editInfo{
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  height: 680px;
}
#imgInput {
  width: 0;
  height: 0;
}

.imgUpdate {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgBox {
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  width: 800px;
}

.imgBoxItem > p {
  margin-bottom: 5px;
  color: #333333;
}

.imgBoxItem > img {
  margin-bottom: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}

.imgBoxItem {
  margin-right: 30px;
  display: flex;
  flex-direction: column;
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