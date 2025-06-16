<script>
import { getMusicPage, scanLocalMusic } from '@/api/music'
import { addToQueue } from '@/api/queue'
import { ElMessage } from 'element-plus'
import { Refresh, Folder } from '@element-plus/icons-vue'

export default {
  name: 'LocalMusicView',
  components: {
    Refresh,
    Folder
  },
  data() {
    return {
      currentMusic: null,
      musicList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      scanning: false,
      dialogVisible: false,
      selectedPath: ''
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
    },
    handleScanClick() {
      this.dialogVisible = true
    },
    async handleScanMusic() {
      if (this.scanning || !this.selectedPath) return
      
      this.scanning = true
      this.dialogVisible = false
      try {
        const response = await scanLocalMusic({
          path: this.selectedPath
        })
        ElMessage.success(`扫描完成，新增 ${response.data} 首音乐`)
        // 扫描完成后刷新列表
        await this.fetchList()
      } catch (error) {
        console.error('扫描本地音乐失败:', error)
        ElMessage.error('扫描本地音乐失败')
      } finally {
        this.scanning = false
        this.selectedPath = ''
      }
    },
    handleDialogClose() {
      this.selectedPath = ''
    },
    async handleSelectFolder() {
      try {
        // 使用 window.showDirectoryPicker API
        const dirHandle = await window.showDirectoryPicker()
        // 获取完整路径
        const path = await this.getFullPath(dirHandle)
        this.selectedPath = path
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('选择文件夹失败:', error)
          ElMessage.error('选择文件夹失败')
        }
      }
    },
    async getFullPath(dirHandle) {
      const pathParts = []
      let currentHandle = dirHandle
      
      while (currentHandle) {
        pathParts.unshift(currentHandle.name)
        try {
          currentHandle = await currentHandle.getParentDirectory()
        } catch (e) {
          // 如果无法获取父目录，说明已经到达根目录
          break
        }
      }
      
      // 在 Windows 上使用反斜杠，在其他系统上使用正斜杠
      const separator = navigator.platform.includes('Win') ? '\\' : '/'
      return pathParts.join(separator)
    }
  }
}
</script>

<template>
  <div class="local-music">
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h2>本地音乐</h2>
          <p class="description">管理您的本地音乐文件</p>
        </div>
        <div class="header-right">
          <el-button 
            type="primary" 
            @click="handleScanClick"
            :loading="scanning"
            :disabled="scanning"
          >
            <el-icon><Refresh /></el-icon>
            {{ scanning ? '扫描中...' : '扫描本地音乐' }}
          </el-button>
        </div>
      </div>
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

    <!-- 文件夹选择对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="选择音乐文件夹"
      width="500px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <div class="folder-select">
        <el-input
          v-model="selectedPath"
          placeholder="请输入音乐文件夹路径"
          class="folder-input"
        >
          <template #append>
            <el-button @click="handleSelectFolder">
              <el-icon><Folder /></el-icon>
              选择文件夹
            </el-button>
          </template>
        </el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button 
            type="primary" 
            @click="handleScanMusic"
            :disabled="!selectedPath"
          >
            开始扫描
          </el-button>
        </span>
      </template>
    </el-dialog>
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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  flex: 1;
}

.header-right {
  margin-left: 20px;
}

.folder-select {
  padding: 20px 0;
}

.folder-input {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style> 