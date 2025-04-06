<template>
  <div class="play-queue">
    <el-table :data="queueList" style="width: 100%">
      <el-table-column prop="title" label="歌曲名"></el-table-column>
      <el-table-column prop="artist" label="艺术家"></el-table-column>
      <el-table-column prop="addedByUsername" label="添加者"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button v-if="canRemove(scope.row)" @click="handleRemove(scope.row.queueId)" type="danger" size="small">
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
import { ElMessage } from 'element-plus'

const queueList = ref([])

onMounted(async () => {
  const response = await getQueueList();
  queueList.value = response.data;
});

const canRemove = (row) => {
  // 这里可以根据业务逻辑判断是否显示“移除”按钮
  // 例如：检查当前用户是否有权限移除该项
  return true; // 暂时返回 true，实际应根据需求调整
};

const handleRemove = async (queueId) => {
  try {
    await removeFromQueue(queueId);
    const response = await getQueueList();
    queueList.value = response.data;
    ElMessage.success('移除成功');
  } catch (error) {
    console.error('从队列移除失败:', error);
    ElMessage.error('移除失败，请重试');
  }
};
</script>