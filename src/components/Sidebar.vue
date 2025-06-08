<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  props: {
    activeTab: {
      type: String,
      default: 'discover'
    },
    playlists: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  methods: {
    handleTabClick(tab) {
      switch (tab) {
        case 'discover':
          this.router.push('/')
          break
        case 'fm':
          this.router.push('/fm')
          break
        case 'video':
          this.router.push('/video')
          break
        case 'friend':
          this.router.push('/friends')
          break
        case 'local':
          this.router.push('/local-music')
          break
      }
    }
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <h1>🎵 音乐播放器</h1>
    </div>

    <div class="nav-menu">
      <div class="nav-item" :class="{ active: activeTab === 'discover' }" @click="handleTabClick('discover')">
        <el-icon><House /></el-icon>
        <span>发现音乐</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'fm' }" @click="handleTabClick('fm')">
        <el-icon><Headset /></el-icon>
        <span>私人FM</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'video' }" @click="handleTabClick('video')">
        <el-icon><VideoPlay /></el-icon>
        <span>视频</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'friend' }" @click="handleTabClick('friend')">
        <el-icon><User /></el-icon>
        <span>朋友</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'local' }" @click="handleTabClick('local')">
        <el-icon><Folder /></el-icon>
        <span>本地音乐</span>
      </div>
    </div>

    <div class="playlist-section">
      <div class="playlist-title">创建的歌单</div>
      <div class="playlist-item" v-for="playlist in playlists" :key="playlist.id">
        {{ playlist.name }} ({{ playlist.songCount }})
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo h1 {
  color: #d33a31;
  font-size: 24px;
  font-weight: bold;
}

.nav-menu {
  padding: 20px 0;
}

.nav-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item:hover {
  background: rgba(211, 58, 49, 0.1);
  color: #d33a31;
}

.nav-item.active {
  background: rgba(211, 58, 49, 0.1);
  color: #d33a31;
  border-right: 3px solid #d33a31;
}

.playlist-section {
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow-y: auto;
}

.playlist-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.playlist-item {
  padding: 8px 0;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.playlist-item:hover {
  color: #d33a31;
}
</style> 