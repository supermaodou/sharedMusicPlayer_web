<script>
import MusicList from '../components/MusicList.vue'

export default {
  name: 'LocalMusicView',
  components: {
    MusicList
  },
  data() {
    return {
      currentMusic: null
    }
  },
  methods: {
    handlePlayMusic(music) {
      this.currentMusic = music
      // 触发父组件的播放事件
      this.$emit('play-music', music)
    }
  }
}
</script>

<template>
  <div class="local-music">
    <div class="page-header">
      <h2>本地音乐</h2>
      <p class="description">管理您的本地音乐文件</p>
    </div>
    
    <div class="music-content">
      <MusicList @play-music="handlePlayMusic" />
    </div>
  </div>
</template>

<style scoped>
.local-music {
  height: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  color: #666;
  font-size: 14px;
}

.music-content {
  height: calc(100% - 80px);
  overflow-y: auto;
  padding-right: 10px;
}

/* 自定义滚动条样式 */
.music-content::-webkit-scrollbar {
  width: 6px;
}

.music-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.music-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.music-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .local-music {
    padding: 15px;
  }
  
  .page-header h2 {
    font-size: 20px;
  }
}
</style> 