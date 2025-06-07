<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getComputerName, updateUsername } from '@/api/user'

const store = useStore()
const username = ref('')
const dialogVisible = ref(false)

onMounted(async () => {
  const computerName = await getComputerName()
  username.value = computerName.data
})

const handleUpdateUsername = () => {
  const userId = store.state.user.userInfo.userId
  updateUsername(userId, username.value)
  dialogVisible.value = false
}
</script>

<template>
  <div class="user-info">
    <span>{{ username }}</span>
    <el-button link @click="dialogVisible = true">修改昵称</el-button>

    <el-dialog v-model="dialogVisible" title="修改昵称" width="30%">
      <el-input v-model="username" placeholder="请输入昵称" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateUsername">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}
</style>