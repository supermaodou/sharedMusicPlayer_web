<script>
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain } from 'element-plus'

export default {
  name: 'App',
  components: {
    RouterView,
    ElContainer,
    ElHeader,
    ElMain,
  }
}
</script>

<template>
  <el-container>
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
  padding: 0;
  margin: 0;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
</style>
