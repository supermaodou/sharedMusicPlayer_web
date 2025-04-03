<script setup>
import MusicPlayer from '../components/MusicPlayer.vue'
import PlayQueue from '../components/PlayQueue.vue'
</script>

<template>
  <div class="home">
    <MusicPlayer class="player-section" />
    <PlayQueue class="queue-section" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.player-section {
  margin-bottom: 20px;
}
</style>