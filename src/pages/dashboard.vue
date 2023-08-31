<script setup>
import {ref} from 'vue'
import {NButton, NDivider, NPagination, NPopconfirm, NDrawer, NDrawerContent} from 'naive-ui'

const list = ref([
  {id: 1, name: "leeho"},
  {id: 2, name: "sudi"},
  {id: 3, name: "yaoyao"},
  {id: 5, name: "lapland"},
  {id: 6, name: "likunling"},
])
const page = ref(1)
/**
 * 抽屉
 */
const active = ref(false);
const placement = ref("right");
// 打开抽屉
const activate = (place) => {
  active.value = true;
  placement.value = place;
};
const add = () => {
  list.value.push({
    id: 7,
    name: 'leehoisleeho'
  })
  active.value = false;
}
const Oncancel = () => {
  active.value = false;
}
// 删除
const confirmDelete = (id) => {
  list.value.forEach((item, index) => {
    if (item.id === id) {
      list.value.splice(index, 1)
    }
  })
}
const cancelDelete = () => {

}
</script>

<template>
  <div class="container">
    <div class="info">
      <p>暂无内容</p>
    </div>
  </div>
</template>

<style scoped>
.info >p{
  color: #999999;
  padding: 20px;
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