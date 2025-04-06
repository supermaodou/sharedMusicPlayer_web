<script setup>
import { ref, onMounted } from 'vue'
import { getMusicList } from '@/api/music'
import { addToQueue } from '@/api/queue'
import { ElMessage } from 'element-plus'

const musicList = ref([])

onMounted(async () => {
  const response = await getMusicList()
  musicList.value = response.data
})

const handleAddToQueue = async (musicId) => {
  try {
    await addToQueue(musicId, 1)
    ElMessage.success('添加到队列成功')
  } catch (error) {
    console.error('添加到队列失败:', error)
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
      <el-table-column prop="title" label="歌曲名" />
      <el-table-column prop="artist" label="艺术家" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" @click="handleAddToQueue(scope.row.id)">
            添加到队列
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>