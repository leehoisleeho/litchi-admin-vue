<script setup>
import {ref} from 'vue'
import {NButton, NDivider, NPopconfirm, NDrawer, NDrawerContent} from 'naive-ui'

const list = ref([])
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
const submit = () => {

}
const onCancel = () => {
  active.value = false;
}

/**
 * create 新增的方法
 */
const create = () => {

}
/**
 * 删除
 * del 删除的方法
 * confirmDelete 确认删除
 * cancelDelete 取消删除
 */
const del = () => {

}
const confirmDelete = (id) => {

}
const cancelDelete = () => {

}
/**
 * 更新
 * update 更新的方法
 * isEdit 编辑状态
 */
const isEdit = ref(false)
const updateBtn = () => {
  active.value = true
}
const update = () => {

}
/**
 * 获取列表
 */
const getList = () => {

}

</script>

<template>
  <div class="container">
    <n-drawer v-model:show="active" :width="720" :placement="placement">
      <n-drawer-content title="添加列表">
        内容
        <template #footer>
          <n-button @click="submit" type="primary">提交</n-button>
          <n-button @click="onCancel" style="margin-left: 10px" type="error">取消</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
    <div class="info">
      <div class="headSticky">
        <div class="infoHeader">
          <n-button type="primary" @click="activate('right')">新增</n-button>
          <n-button type="info" style="margin-left: 10px" ghost>导出</n-button>
        </div>
        <ul class="tableTitle">
          <li>序号</li>
          <li>姓名</li>
          <li>联系电话</li>
          <li>邮箱</li>
          <li>地址</li>
          <li>操作</li>
        </ul>
        <n-divider title-placement="mid" style="color: #999;font-size: 13px" v-show="list.length === 0">
          没有数据
        </n-divider>
      </div>
      <TransitionGroup name="list" tag="div">
        <ul class="tableInfo" v-for="item in list" :key="item.id">
          <li>1</li>
          <li>lapland</li>
          <li>18608735101</li>
          <li>leehovip@gmail.com</li>
          <li>蒙自市红竺园B区联8-1</li>
          <li>
            <n-button type="info" size="small" @click="updateBtn">查看</n-button>
            <n-popconfirm
                @positive-click="confirmDelete(item.id)"
                @negative-click="cancelDelete"
                positive-text="确认"
                negative-text="取消"
            >
              <template #trigger>
                <n-button type="error" size="small">删除</n-button>
              </template>
              确认删除吗？
            </n-popconfirm>
          </li>
        </ul>
      </TransitionGroup>
      <n-divider title-placement="mid" style="color: #666;font-size: 13px" v-show="list.length !== 0">
        {{ list.length }}条数据
      </n-divider>
    </div>
  </div>
</template>

<style scoped>
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

.tableInfo:hover {
  background: #f8f8f8;
}

.tableInfo {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
}

.tableInfo > li {
  flex: 1;
  text-align: center;
  color: #333333;
  font-size: 13px;
  padding: 20px 0;
}

.tableTitle > li {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #333333;
}

.tableTitle {
  display: flex;
  margin-bottom: 10px;
}

.infoHeader {
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 20px;
}

.headSticky {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: white;
//box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; padding-bottom: 10px; z-index: 1;
}

.info {
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  overflow-y: auto;
  position: relative;
}

.container {
  width: 100%;
  height: calc(100vh - 80px);
  padding: 20px;
}
</style>