<script>
import { getComputerName, updateUsername } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data() {
    return {
      username: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo.userId
    })
  },
  mounted() {
    this.fetchComputerName()
  },
  methods: {
    async fetchComputerName() {
      const computerName = await getComputerName()
      this.username = computerName.data
    },
    handleUpdateUsername() {
      updateUsername(this.userId, this.username)
      this.dialogVisible = false
    }
  }
}
</script>

<template>
  <div class="user-info">
    <span class="username">{{ username }}</span>
    <el-button link @click="dialogVisible = true">修改昵称</el-button>

    <el-dialog 
      v-model="dialogVisible" 
      title="修改昵称" 
      width="30%" 
      :append-to-body="true"
      :modal-append-to-body="true"
      destroy-on-close>
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
}

.username {
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

:deep(.el-button--link) {
  color: #409EFF;
}

:deep(.el-button--link:hover) {
  color: #66b1ff;
}
</style>