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
import UploadVideo from "../components/UploadVideo.vue";
import api from '/API/api.js'
import verifyData from '/src/util/verifyData.js'
import timestamp from '/src/util/date.js'
import 'vue3-video-play/dist/style.css'
import {videoPlay} from 'vue3-video-play'

const message = useMessage()
const title = ref('')
const src = ref('')
const list = ref([])
const page = ref(1)
// 页面加载时
onMounted(() => {
  getVideo()
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
      msg: '视频名称不能为空',
    },
    {
      data: src.value,
      msg: '还没有传视频',
    },
  ])
  if (msg === 0) {
    addVideo()
  } else {
    message.error(msg)
  }
}
// 取消抽屉
const Oncancel = () => {
  active.value = false;
}
// 图片上传成功的自定义事件
const videoChange = (val) => {
  src.value = val
}
// 新增
const addVideo = () => {
  api.addVideo({
    title: title.value,
    src: src.value,
    createtime: timestamp()
  }).then(res => {
    console.log(123)
    message.success('上传成功')
    getVideo()
    active.value = false
  })
}
// 删除
const confirmDelete = (id) => {
  api.delVideo({id}).then(res => {
    getVideo()
  })
}
// 查看
const getVideo = () => {
  api.getVideo().then(res => {
    let arr = res.data
    // 判断是否有isindex为1 的视频
    let isindex = arr.filter(item => {
      return item.isindex === 1
    })
    if (isindex.length === 0) {
      // 没有主页显示视频的时候
      arr.forEach(item => {
        item.disabled = false
        item.btndisabled = false
      })
    } else {
      // 有主页实现视频的时候
      arr.forEach(item => {
        if (item.isindex === 1) {
          item.disabled = false
          item.btndisabled = true
          return
        }
        item.disabled = true
        item.btndisabled = false
      })
    }
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
    getVideo()
  })
}
// 开关状态
const handleUpdateValue = (item) => {
  let isIndexVal = item.isindex
  // 如果是1
  if (isIndexVal === 1) {
    api.editVideo({
      id: item.id,
      isindex: 0
    }).then(res => {
      console.log(res)
      getVideo()
    })
  } else if (isIndexVal === 0) {
    api.editVideo({
      id: item.id,
      isindex: 1
    }).then(res => {
      console.log(res)
      getVideo()
    })
  }
}
</script>

<template>
  <div class="container">
    <n-drawer v-model:show="active" :width="800" :placement="placement">
      <n-drawer-content title="添加视频">
        <div class="formBox">
          <div class="title">
            视频名称
          </div>
          <n-input v-model:value="title" type="text" placeholder="请输入视频标题"/>
        </div>
        <div class="formBox">
          <div class="title">
            上传视频资源
          </div>
          <UploadVideo style="margin-bottom:20px" :src='src' @change="videoChange"></UploadVideo>
          <videoPlay :autoPlay='false' width="800" preload='meta' :src="src" v-show="src !==''"></videoPlay>
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
        <li>视频标题</li>
        <li>观看量</li>
        <li>创建时间</li>
        <li>主页显示</li>
        <li>操作</li>
      </ul>
      <n-divider title-placement="mid" style="color: #999;font-size: 13px" v-show="list.length === 0">
        没有数据
      </n-divider>
      <TransitionGroup name="list" tag="div">
        <ul class="tableInfo" v-for="item in list" :key="item.id">
          <li>{{ item.id }}</li>
          <li>{{ item.title }}</li>
          <li>{{ item.views }}</li>
          <li>{{ item.createtime }}</li>
          <li>
            <n-switch
                :disabled="item.disabled"
                @update:value="handleUpdateValue(item)"
                :default-value="item.isindex===1"
            />
          </li>
          <li>
            <n-button type="info" size="small" @click="editBut(item)">查看</n-button>
            <n-popconfirm
                @positive-click="confirmDelete(item.id)"
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
  height: 140px;
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