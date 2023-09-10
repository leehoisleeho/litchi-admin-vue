<script setup>
import {ref} from 'vue'
import {NButton, NDivider, NDrawer, NDrawerContent, NPopconfirm} from 'naive-ui'
import api from "../../API/api.js";

/* ----------表格数据-------------*/
const list = ref([])
/* ----------end----------------*/

/* ----------表头内容-------------*/
const tableHeader = ['id', '姓名', '邮箱', '电话',]
/* ----------end----------------*/

/* ----------抽屉-------------*/
/**
 * activate 打开抽屉
 * submit 抽屉确认
 * onCancel 抽屉取消
 */
const active = ref(false);
const placement = ref("right");
const activate = (place) => {
  active.value = true;
  placement.value = place;
};
const submit = () => {
  active.value = false;
}
const onCancel = () => {
  active.value = false;
}
/* ----------end-------------*/

/* ----------create-------------*/
/**
 * create 新增的方法
 */
const create = () => {
}
/* ----------end-------------*/


/* ----------delete-------------*/
/**
 * confirmDelete 确认删除
 * cancelDelete 取消删除
 */
const del = () => {
}
const confirmDelete = (index) => {
  console.log(index)
  list.value.splice(index,1)
}
const cancelDelete = () => {}
/* ----------end-------------*/


/* ----------update-------------*/
/*
 * update 更新的方法
 * isEdit 编辑状态
 */
const isEdit = ref(false)
const updateBtn = (item) => {
  console.log(item)
  active.value = true
}
const update = () => {
}
/* ----------end-------------*/


/* ----------get-------------*/
const getList = () => {
}
/* ----------end-------------*/
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
      <div class="tableBox">
        <div class="Header">
          <NButton type="primary" style="margin: 0 10px">新增</NButton>
          <NButton type="primary" ghost>导出</NButton>
          <ul class="tableHeader">
            <li v-for="item in tableHeader" :key="item">{{ item }}</li>
            <li>操作</li>
          </ul>
        </div>
        <TransitionGroup name="list" tag="div">
          <ul class="tableInfo" v-for="(item,index) in list" :key="item.id">
            <li>{{ item.id }}</li>
            <li>{{ item.name }}</li>
            <li>{{ item.mail }}</li>
            <li>{{ item.phone }}</li>
            <li>
              <n-button quaternary type="info" @click="updateBtn(item)">编辑</n-button>
              <n-popconfirm
                  @positive-click="confirmDelete(index)"
                  @negative-click="cancelDelete"
                  positive-text="确认"
                  negative-text="取消"
              >
                <template #trigger>
                  <n-button quaternary type="error">删除</n-button>
                </template>
                确认删除吗？
              </n-popconfirm>
            </li>
          </ul>
        </TransitionGroup>
        <div class="foot">
          <n-divider title-placement="mid">数据{{ list.length }}条</n-divider>
        </div>
      </div>
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
  transform: translateY(30px);
}

.n-divider {
  font-size: 12px;
  color: #a2a2a2;
}

.tableInfo {
  display: flex;
  align-items: center;
}

.tableInfo:hover {
  background: #f5f5f5;
  cursor: pointer;
}

.tableInfo > li {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 13px;
}

.tableHeader {
  display: flex;
  align-items: center;
  margin-top: 10px;
  background: #4285f4;
  color: #ffffff;
  font-weight: 600;
}

.tableHeader li {
  flex: 1;
  text-align: center;
  padding: 15px 0;
  font-size: 13px;
}

.Header {
  border: 1px solid #f1f1f1;
  padding-top: 10px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1;
}

.tableBox {
  position: relative;
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