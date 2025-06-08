<script>
import UserInfo from './UserInfo.vue'

export default {
  name: 'Header',
  components: {
    UserInfo
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['update:searchQuery', 'search'],
  computed: {
    localSearchQuery: {
      get() {
        return this.searchQuery
      },
      set(value) {
        this.$emit('update:searchQuery', value)
      }
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search')
    }
  }
}
</script>

<template>
  <div class="header">
    <div class="nav-buttons">
      <el-button circle size="small">
        <span>←</span>
      </el-button>
      <el-button circle size="small">
        <span>→</span>
      </el-button>
    </div>

    <div class="search-bar">
      <el-input v-model="localSearchQuery" placeholder="搜索音乐、视频、电台、用户" prefix-icon="Search" clearable
        @keyup.enter="handleSearch">
      </el-input>
    </div>

    <div class="user-info">
      <UserInfo />
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.search-bar {
  flex: 1;
  max-width: 400px;
}

.user-info {
  margin-left: auto;
}
</style> 