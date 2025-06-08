<script>
import { getMusicPage } from '@/api/music'
import { addToQueue } from '@/api/queue'
import { ElMessage } from 'element-plus'

export default {
  name: 'LocalMusicView',
  data() {
    return {
      currentMusic: null,
      musicList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      this.loading = true
      try {
        const response = await getMusicPage({
          page: this.currentPage,
          size: this.pageSize
        })
        this.musicList = response.data.records
        this.total = response.data.total
      } catch (error) {
        console.error('获取音乐列表失败:', error)
        ElMessage.error('获取音乐列表失败')
      } finally {
        this.loading = false
      }
    },
    async handleAddToQueue(musicId) {
      try {
        await addToQueue(musicId, 1)
        ElMessage.success('添加到队列成功')
      } catch (error) {
        console.error('添加到队列失败:', error)
        ElMessage.error('添加到队列失败')
      }
    },
    handlePlayMusic(music) {
      this.currentMusic = music
      // 触发父组件的播放事件
      this.$emit('play-music', music)
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchList()
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
      <el-card class="music-card">
        <el-table 
          :data="musicList" 
          style="width: 100%"
          :row-class-name="'music-row'"
          @row-dblclick="handlePlayMusic"
          v-loading="loading"
        >
          <el-table-column prop="title" label="歌曲名" min-width="300">
            <template #default="scope">
              <div class="song-info">
                <img :src="scope.row.cover" :alt="scope.row.title" class="song-cover">
                <div class="song-details">
                  <span class="song-title" @click="handlePlayMusic(scope.row)">{{ scope.row.title }}</span>
                  <span class="song-artist">{{ scope.row.artist }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="album" label="专辑" min-width="200" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button text @click="handleAddToQueue(scope.row.id)">
                <el-icon><Plus /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
            background
          />
        </div>
      </el-card>
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  margin-bottom: 20px;
  flex-shrink: 0;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.music-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.music-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.song-cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.song-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.song-title {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;
}

.song-title:hover {
  color: #409EFF;
}

.song-artist {
  font-size: 12px;
  color: #999;
}

.pagination-container {
  padding: 16px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  z-index: 1;
}

:deep(.music-row) {
  transition: background-color 0.3s;
}

:deep(.music-row:hover) {
  background-color: #f5f7fa;
}

:deep(.el-table) {
  flex: 1;
  --el-table-border-color: #f0f0f0;
  --el-table-header-bg-color: #fafafa;
}

:deep(.el-table__body-wrapper) {
  overflow-y: auto;
}

:deep(.el-table th) {
  font-weight: 600;
  color: #333;
  background-color: #fafafa;
}

:deep(.el-table td) {
  padding: 8px 0;
}

/* 自定义滚动条样式 */
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  background: #f1f1f1;
  border-radius: 3px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  background: #888;
  border-radius: 3px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb:hover) {
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