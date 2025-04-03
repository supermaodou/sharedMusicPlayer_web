<template>
  <div class="music-player">
    <el-card>
      <div v-if="currentPlaying">
        <h3>{{ currentPlaying.title }}</h3>
        <p>{{ currentPlaying.artist }}</p>
        <audio
          :src="currentPlaying.url"
          controls
          @ended="handleSongEnd"
        ></audio>
      </div>
      <div v-else>
        暂无播放中的音乐
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import websocket from '@/utils/websocket'

const store = useStore()
const currentPlaying = computed(() => store.state.queue.currentPlaying)

const handleSongEnd = () => {
  websocket.send(JSON.stringify({ type: 'SONG_ENDED' }))
}
</script>