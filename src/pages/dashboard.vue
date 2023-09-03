<script setup></script>

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