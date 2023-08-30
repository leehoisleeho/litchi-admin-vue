<script setup>
import {ref} from 'vue'
import {NButton,NDivider,NPagination,NPopconfirm,NDrawer,NDrawerContent} from 'naive-ui'
const list = ref([
  {id:2,name:"leeho"},
  {id:2,name:"sudi"},
  {id:2,name:"yaoyao"},
  {id:2,name:"yaoyao"},
])
const page = ref(1)
const handlePositiveClick = ()=>{
  console.log('ok')
}
const handleNegativeClick = ()=>{
  console.log('no')
}
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
const add = ()=>{
  active.value = false;
}
const Oncancel = ()=>{
  active.value = false;
}
</script>

<template>
  <div class="container">
    <n-drawer v-model:show="active" :width="888" :placement="placement">
      <n-drawer-content title="添加列表">
        内容
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
        <li>姓名</li>
        <li>联系电话</li>
        <li>邮箱</li>
        <li>地址</li>
        <li>操作</li>
      </ul>
      <n-divider title-placement="mid" style="color: #999;font-size: 13px" v-show="list.length === 0">
        没有数据
      </n-divider>
      <ul class="tableInfo" v-for="item in list">
        <li>1</li>
        <li>李浩</li>
        <li>18608735101</li>
        <li>leehovip@gmail.com</li>
        <li>蒙自市红竺园B区联8-1</li>
        <li>
          <n-button type="info" size="small">
            查看
          </n-button>
          <n-popconfirm
              @positive-click="handlePositiveClick"
              @negative-click="handleNegativeClick"
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
      <n-divider title-placement="mid" style="color: #666;font-size: 13px">
        {{list.length}}条数据
      </n-divider>
      <div class="pagination">
        <n-pagination v-model:page="page" :page-count="1" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tableInfo>li>.n-button{
  margin-right: 10px;
}
.pagination{
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
.tableInfo{
  display: flex;
  padding: 20px 0;
  align-items: center;
}
.tableInfo>li{
  flex: 1;
  text-align: center;
  color: #333333;
}
.tableTitle>li{
  flex: 1;
  text-align: center;

}
.tableTitle{
  display: flex;
  margin-bottom: 10px;
}
.infoHeader{
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-right: 20px;
  height: 70px;
}
.info{
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