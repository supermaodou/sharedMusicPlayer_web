<script setup>
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain } from 'element-plus'
import UserInfo from './components/UserInfo.vue'
</script>

<template>
  <el-container>
    <el-header height="60px">
      <div class="header-content">
        <h1>共享音乐播放器</h1>
        <UserInfo />
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.el-header {
  background-color: #409eff;
  color: white;
  line-height: 60px;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
</style>
