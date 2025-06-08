<script>
import { ElMessage } from 'element-plus'
import { Star, Download, ChatDotRound } from '@element-plus/icons-vue'

export default {
  name: 'RecentSongs',
  components: {
    Star,
    Download,
    ChatDotRound
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  emits: ['play'],
  methods: {
    handlePlay(song) {
      this.$emit('play', song)
    },
    toggleLike(song) {
      song.liked = !song.liked
      const message = song.liked ? `已添加 ${song.title} 到我喜欢的音乐` : `已从我喜欢的音乐中移除 ${song.title}`
      ElMessage.success(message)
    }
  }
}
</script>

<template>
  <div class="recent-songs">
    <div class="section-title">最近播放</div>
    <div class="song-list">
      <div class="song-item" v-for="(song, index) in songs" :key="song.id" @click="handlePlay(song)">
        <el-row :gutter="20" align="middle">
          <el-col :span="1">
            <span style="color: #999; font-size: 14px;">{{ String(index + 1).padStart(2, '0') }}</span>
          </el-col>
          <el-col :span="8">
            <div style="font-weight: 500;">{{ song.title }}</div>
            <div style="color: #666; font-size: 12px; margin-top: 2px;">{{ song.artist }}</div>
          </el-col>
          <el-col :span="6">
            <span style="color: #999; font-size: 12px;">{{ song.album }}</span>
          </el-col>
          <el-col :span="6">
            <div style="display: flex; align-items: center; gap: 10px;">
              <el-button size="small" text @click.stop="toggleLike(song)">
                <el-icon :style="{ color: song.liked ? '#d33a31' : '#999' }"><Star /></el-icon>
              </el-button>
              <el-button size="small" text>
                <el-icon><Download /></el-icon>
              </el-button>
              <el-button size="small" text>
                <el-icon><ChatDotRound /></el-icon>
              </el-button>
            </div>
          </el-col>
          <el-col :span="3">
            <span style="color: #999; font-size: 12px;">{{ song.duration }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recent-songs {
  margin-top: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.song-list {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.song-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #f5f5f5;
}

.song-item:last-child {
  border-bottom: none;
}

.song-item:hover {
  background: #f9f9f9;
}

.el-icon {
  font-size: 18px;
  transition: all 0.3s;
}

.el-button:hover .el-icon {
  transform: scale(1.1);
}
</style> 