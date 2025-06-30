<template>
  <div class="play-queue">
    <el-table :data="queue" style="width: 100%" @row-dblclick="handlePlayMusic">
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
import { mapState, mapActions } from 'vuex'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

export default {
  name: 'PlayQueue',
  components: { Close },
  computed: {
    ...mapState('queue', ['queue'])
  },
  methods: {
    ...mapActions('queue', ['fetchQueue']),
    canRemove(row) {
      // 这里可以根据业务逻辑判断是否显示"移除"按钮
      // 例如：检查当前用户是否有权限移除该项
      return true; // 暂时返回 true，实际应根据需求调整
    },
    async handleRemove(queueId) {
      try {
        await this.$store.dispatch('queue/removeFromQueue', queueId)
        ElMessage.success('移除成功');
        await this.fetchQueue();
      } catch (error) {
        console.error('从队列移除失败:', error);
        ElMessage.error('移除失败，请重试');
      }
    },
    handlePlayMusic(music) {
      this.$emit('play-music', music)
    }
  },
  mounted() {
    this.fetchQueue()
  }
}
</script>