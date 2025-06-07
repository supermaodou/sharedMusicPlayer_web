<script>
import { getMusicList } from '@/api/music'
import { addToQueue } from '@/api/queue'
import { ElMessage } from 'element-plus'

export default {
  name: 'MusicList',
  data() {
    return {
      musicList: []
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      const response = await getMusicList()
      this.musicList = response.data
    },
    async handleAddToQueue(musicId) {
      try {
        await addToQueue(musicId, 1)
        ElMessage.success('添加到队列成功')
      } catch (error) {
        console.error('添加到队列失败:', error)
      }
    },
    emitPlayMusic(row) {
      this.$emit('play-music', row)
    }
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>音乐列表</span>
      </div>
    </template>
    
    <el-table :data="musicList" style="width: 100%">
      <el-table-column prop="title" label="歌曲名">
        <template #default="scope">
          <span style="cursor:pointer;color:#409EFF" @click="emitPlayMusic(scope.row)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="artist" label="艺术家" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button link @click="emitPlayMusic(scope.row)">播放</el-button>
          <el-button link @click="handleAddToQueue(scope.row.id)">添加到队列</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>