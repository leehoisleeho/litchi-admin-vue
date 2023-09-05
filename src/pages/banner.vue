<script setup>
import {onMounted, ref} from 'vue'
import {
  NButton,
  NDivider,
  NPagination,
  NPopconfirm,
  NDrawer,
  NDrawerContent,
  NSelect,
  NInput,
  useMessage,
  NSwitch
} from 'naive-ui'
import api from '/API/api.js'
import verifyData from '/src/util/verifyData.js'
import timestamp from '/src/util/date.js'
import ImgOne from "../components/ImgOne.vue";

const message = useMessage()
// 封面的img
const src = ref('')
const list = ref([])
const newsList = ref([])
const page = ref(1)
//选择器val
const value = ref()
//选择器options
const options = ref([])
// 页面加载时
onMounted(() => {
  getBanner()
})
/**
 * 抽屉
 */
const active = ref(false);
const placement = ref("right");
// 打开抽屉
const activate = (place) => {
  active.value = true;
  //重置
  isEdit.value = false
  src.value = ''
  title.value = ''
  placement.value = place;
};
// 确认抽屉
const add = () => {
  if (isEdit.value) {
    editVideo()
    return
  }
  let msg = verifyData([
    {
      data: title.value,
      msg: '请选择新闻',
    },
    {
      data: src.value,
      msg: '还没有上传封面',
    },
  ])
  if (msg === 0) {
    addBanner()
  } else {
    message.error(msg)
  }
}
// 取消抽屉
const Oncancel = () => {
  active.value = false;
}
// 新增
const addBanner = () => {
  api.addBanner({
    newsid: newsid.value,
    title: title.value,
    img: src.value,
    createtime: timestamp()
  }).then(res => {
    api.editNews({
      id: newsid.value,
      isbanner: 1
    }).then(res => {
      message.success('上传成功')
      getBanner()
      active.value = false
    })
  })
}
// 删除
const confirmDelete = (item) => {
  api.delBanner({id: item.id}).then(res => {
    api.editNews({
      id: item.newsid,
      isbanner: 0
    }).then(res => {
      getBanner()
    })
  })
}
// 查看
const getBanner = () => {
  api.getBanner().then(res => {
    let arr = res.data
    list.value = arr
  })
}
// 编辑
const isEdit = ref(false)
const id = ref("")
const editBut = (item) => {
  isEdit.value = true
  id.value = item.id
  title.value = item.title
  src.value = item.src
  active.value = true
}
const editVideo = () => {
  api.editVideo({
    id: id.value,
    title: title.value,
    src: src.value,
  }).then(res => {
    isEdit.value = false
    active.value = false
    getBanner()
  })
}
// 选择器
const newsid = ref('')
const title = ref('')
// 选择新闻
const onChange = (e) => {
  newsid.value = e
  newsList.value.forEach(item => {
    if (item.id === e) {
      title.value = item.title
    }
  })
}
// 打开选择器
const onShow = () => {
// 获取新闻列表 赋值给选择器的options
  api.getNews().then(res => {
    newsList.value = res.data
    let arr = []
    res.data.forEach(item => {
      if (item.isbanner === 1) {
        arr.push({
          label: item.title,
          value: item.id,
          disabled: true
        })
        return
      }
      arr.push({
        label: item.title,
        value: item.id,
        disabled: false
      })
    })
    options.value = arr
  })
}
</script>

<template>
  <div class="container">
    <n-drawer v-model:show="active" :width="800" :placement="placement">
      <n-drawer-content title="添加轮播图">
        <div class="formBox">
          <div class="title">
            选择新闻
          </div>
          <n-select v-model:value="value" :options="options" @update:value="onChange" @update:show="onShow"/>
        </div>
        <div class="formBox">
          <div class="title">
            上传轮播图封面
          </div>
          <ImgOne v-model:src="src" :imgSize="[400,224]"></ImgOne>
        </div>
        <template #footer>
          <n-button @click="add" type="primary">确认</n-button>
          <n-button @click="Oncancel" style="margin-left: 10px" type="error">取消</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
    <div class="info">
      <div class="infoHeader">
        <n-button type="primary" @click="activate('right')">新增</n-button>
      </div>
      <ul class="tableTitle">
        <li>序号</li>
        <li>新闻ID</li>
        <li>新闻标题</li>
        <li>封面</li>
        <li>创建时间</li>
        <li>操作</li>
      </ul>
      <n-divider title-placement="mid" style="color: #999;font-size: 13px" v-show="list.length === 0">
        没有数据
      </n-divider>
      <TransitionGroup name="list" tag="div">
        <ul class="tableInfo" v-for="item in list" :key="item.id">
          <li>{{ item.id }}</li>
          <li>{{ item.newsid }}</li>
          <li>{{ item.title }}</li>
          <li>
            <img :src="item.img" alt="">
          </li>
          <li>
            {{ item.createtime }}
          </li>
          <li>
            <n-popconfirm
                @positive-click="confirmDelete(item)"
                positive-text="确认"
                negative-text="取消"
            >
              <template #trigger>
                <n-button type="error" size="small" :disabled="item.btndisabled">删除</n-button>
              </template>
              确认删除吗？
            </n-popconfirm>
          </li>
        </ul>
      </TransitionGroup>
      <n-divider title-placement="mid" style="color: #666;font-size: 13px" v-show="list.length !== 0">
        {{ list.length }}条数据
      </n-divider>
      <div class="pagination">
        <n-pagination v-model:page="page" :page-count="1"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tableInfo > li > img {
  width: 100px;
  height: 56px;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.formBox {
  margin-bottom: 20px;
}

.title {
  font-size: medium;
  margin-bottom: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 300ms ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.tableInfo > li > .n-button {
  margin-right: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

.tableInfo {
  display: flex;
  padding: 20px 0;
  align-items: center;
}

.tableInfo > li {
  flex: 1;
  text-align: center;
  color: #333333;
}

.tableTitle > li {
  flex: 1;
  text-align: center;

}

.tableTitle {
  display: flex;
  margin-bottom: 10px;
}

.infoHeader {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-right: 20px;
  height: 70px;
}

.info {
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: auto;
}

.container {
  height: calc(100vh - 80px);
  padding: 20px;

}
</style>