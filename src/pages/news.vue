<script setup>
import {onMounted, ref} from 'vue'
import {
  NButton,
  NDivider,
  NPagination,
  NPopconfirm,
  NDrawer,
  NDrawerContent,
  NInput,
  useMessage,
  NSwitch
} from 'naive-ui'
import ImgOne from "../components/ImgOne.vue";
import Editor from "../components/Editor.vue"
import api from '/API/api.js'
import verifyData from '/src/util/verifyData.js'
import timestamp from '/src/util/date.js'

const message = useMessage()
const title = ref('')
const content = ref('')
const img = ref('')
const list = ref([])
const page = ref(1)
// 页面加载时
onMounted(() => {
  getNews()
})
/**
 * 抽屉
 */
const active = ref(false);
const placement = ref("right");
/**
 * 富文本编辑器
 */
const EditorChange = (val) => {
  console.log(val)
  content.value = val
}
// 图片上传成功的自定义时间
const onSuccess = (val) => {
  img.value = val
}
// 打开抽屉
const activate = (place) => {
  active.value = true;
  //重置
  isEdit.value = false
  img.value = ''
  content.value = ''
  title.value = ''
  placement.value = place;
};
// 新增新闻的方法
const addNews = () => {
  api.addNews({
    title: title.value,
    img: img.value,
    content: content.value,
    createtime: timestamp()
  }).then(res => {
    message.success('添加成功')
    getNews()
    active.value = false
  })
}
// 获取新闻
const getNews = () => {
  api.getNews().then(res => {
    let arr = res.data
    arr.forEach(item => {
      if (item.isbanner === 1) {
        item.disabled = true
        return
      }
      item.disabled = false
    })
    list.value = arr
  })
}
const add = () => {
  if (isEdit.value) {
    editNews()
    return
  }
  let msg = verifyData([
    {
      data: title.value,
      msg: '新闻标题不能为空',
    },
    {
      data: img.value,
      msg: '新闻图片不能为空',
    },
    {
      data: content.value,
      msg: '内容不能为空',
    }
  ])
  if (msg === 0) {
    addNews()
  } else {
    message.error(msg)
  }
}
const Oncancel = () => {
  active.value = false;
}
// 删除
const confirmDelete = (id) => {
  api.delNews({id}).then(res => {
    message.success('删除成功')
    getNews()
  })
}
// 编辑
const isEdit = ref(false)
const id = ref("")
const editBut = (item) => {
  id.value = item.id
  isEdit.value = true
  title.value = item.title
  img.value = item.img
  content.value = item.content
  active.value = true
}
const editNews = () => {
  api.editNews({
    id: id.value,
    title: title.value,
    img: img.value,
    content: content.value,
  }).then(res => {
    isEdit.value = false
    active.value = false
    getNews()
  })
}

</script>

<template>
  <div class="container">
    <n-drawer v-model:show="active" :width="800" :placement="placement">
      <n-drawer-content title="添加新闻">
        <div class="formBox">
          <div class="title">
            新闻标题
          </div>
          <n-input v-model:value="title" type="text" placeholder="请输入新闻标题"/>
        </div>
        <div class="formBox">
          <div class="title">
            上传新闻封面
          </div>
          <ImgOne v-model:src="img"></ImgOne>
        </div>
        <div class="formBox">
          <div class="title">
            新闻内容
          </div>
          <Editor @change="EditorChange" :content=content></Editor>
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
        <li>新闻标题</li>
        <li>创建时间</li>
        <li>浏览量</li>
        <li>是否是轮播图</li>
        <li>操作</li>
      </ul>
      <n-divider title-placement="mid" style="color: #999;font-size: 13px" v-show="list.length === 0">
        没有数据
      </n-divider>
      <TransitionGroup name="list" tag="div">
        <ul class="tableInfo" v-for="item in list" :key="item.id">
          <li>{{ item.id }}</li>
          <li>{{ item.title }}</li>
          <li>{{ item.createtime }}</li>
          <li>{{ item.views }}</li>
          <li>
            <span style="color: red" v-if="item.isbanner===1">是</span>
            <span v-if="item.isbanner===0">否</span>
          </li>
          <li>
            <n-button type="info" size="small" @click="editBut(item)">查看</n-button>
            <n-popconfirm
                @positive-click="confirmDelete(item.id)"
                positive-text="确认"
                negative-text="取消"
            >
              <template #trigger>
                <n-button type="error" size="small" :disabled="item.disabled">删除</n-button>
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