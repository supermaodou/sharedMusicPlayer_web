<script setup>
import { ref, onMounted } from 'vue'
import { getMusicList } from '@/api/music'

const musicList = ref([])

onMounted(async () => {
  const response = await getMusicList()
  musicList.value = response.data
})

// const handleAddToQueue = async (musicId) => {
//   try {
//     await addToQueue(musicId)
//   } catch (error) {
//     console.error('添加到队列失败:', error)
//   }
// }

const addToQueue = async (musicId) => {
  try {
    await fetch('/api/queue/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ musicId })
    })
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
          <el-button type="text" @click="addToQueue(scope.row.id)">
            添加到队列
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>