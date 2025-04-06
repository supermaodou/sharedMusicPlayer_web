<template>
  <div class="music-player">
    <el-card>
      <div v-if="currentPlaying">
        <h3>{{ currentPlaying.title }}</h3>
        <p>{{ currentPlaying.artist }}</p>
        <audio
          ref="audioPlayer"
          :src="currentPlaying.url"
          controls
          @play="handlePlay"
          @pause="handlePause"
          @timeupdate="handleTimeUpdate"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import websocket from '@/utils/websocket'

const store = useStore()
const audioPlayer = ref(null)
const currentPlaying = computed(() => store.state.queue.currentPlaying)
const playingState = computed(() => store.state.queue.playingState)
const playProgress = computed(() => store.state.queue.playProgress)

// 监听播放状态变化
watch(playingState, (newState) => {
  if (audioPlayer.value) {
    if (newState) {
      audioPlayer.value.play()
    } else {
      audioPlayer.value.pause()
    }
  }
})

// 监听播放进度变化
watch(playProgress, (newProgress) => {
  if (audioPlayer.value && Math.abs(audioPlayer.value.currentTime - newProgress) > 1) {
    audioPlayer.value.currentTime = newProgress
  }
})

const handlePlay = () => {
  websocket.sendPlayState(true)
}

const handlePause = () => {
  websocket.sendPlayState(false)
}

const handleTimeUpdate = () => {
  if (audioPlayer.value) {
    websocket.sendPlayProgress(audioPlayer.value.currentTime)
  }
}

const handleSongEnd = () => {
  websocket.sendSongEnded()
}
</script>