<template>
  <div class="play-queue">
    <el-table :data="queueList" style="width: 100%" @row-dblclick="handlePlayMusic">
      <el-table-column prop="title" label="歌曲名"></el-table-column>
      <el-table-column prop="artist" label="艺术家"></el-table-column>
      <el-table-column prop="addedByUsername" label="添加者"></el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button v-if="canRemove(scope.row)" @click="handleRemove(scope.row.queueId)" text circle>
            <el-icon><Close /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getQueueList, removeFromQueue } from '@/api/queue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PlayQueue',
  data() {
    return {
      queueList: []
    }
  },
  mounted() {
    this.fetchQueue()
  },
  methods: {
    async fetchQueue() {
      const response = await getQueueList();
      this.queueList = response.data;
    },
    canRemove(row) {
      // 这里可以根据业务逻辑判断是否显示"移除"按钮
      // 例如：检查当前用户是否有权限移除该项
      return true; // 暂时返回 true，实际应根据需求调整
    },
    async handleRemove(queueId) {
      try {
        await removeFromQueue(queueId);
        await this.fetchQueue();
        ElMessage.success('移除成功');
      } catch (error) {
        console.error('从队列移除失败:', error);
        ElMessage.error('移除失败，请重试');
      }
    },
    handlePlayMusic(music) {
      this.$emit('play-music', music)
    }
  }
}
</script>