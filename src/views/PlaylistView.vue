<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AddMusic from '@/components/AddMusic.vue'
import MusicList from '@/components/MusicList.vue'

const store = useStore()
const activeTab = ref('list')

onMounted(() => {
  store.dispatch('music/fetchMusicList')
})
</script>

<template>
  <div class="playlist-view">
    <el-tabs v-model="activeTab" class="playlist-tabs">
      <el-tab-pane label="音乐列表" name="list">
        <MusicList />
      </el-tab-pane>
      <el-tab-pane label="添加音乐" name="add">
        <AddMusic />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.playlist-view {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.playlist-tabs {
  margin-bottom: 20px;
}

:deep(.el-tabs__content) {
  padding: 20px 0;
}
</style>