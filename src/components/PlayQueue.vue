<template>
  <div class="play-queue">
    <el-table :data="queueList" style="width: 100%">
      <el-table-column prop="title" label="歌曲名"></el-table-column>
      <el-table-column prop="artist" label="艺术家"></el-table-column>
      <el-table-column prop="addedBy" label="添加者"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button
            v-if="handleRemove(scope.row)"
            @click="removeFromQueue(scope.row.id)"
            type="danger"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getQueueList, removeFromQueue } from '@/api/queue'

const queueList = ref([])

onMounted(async () => {
  const response = await getQueueList()
  queueList.value = response.data
})

const handleRemove = async (id) => {
  try {
    await removeFromQueue(id)
    const response = await getQueueList()
    queueList.value = response.data
  } catch (error) {
    console.error('从队列移除失败:', error)
  }
}
</script>