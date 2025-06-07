<script>
import MusicPlayer from '../components/MusicPlayer.vue'
import MusicList from '../components/MusicList.vue'
import PlayQueue from '../components/PlayQueue.vue'

export default {
  name: 'HomeView',
  components: {
    MusicPlayer,
    MusicList,
    PlayQueue
  },
  data() {
    return {
      currentMusic: null
    }
  },
  methods: {
    handlePlayMusic(music) {
      this.currentMusic = music
    }
  }
}
</script>

<template>
  <div class="home">
    <MusicPlayer class="player-section" :currentMusic="currentMusic" />
    <MusicList class="list-section" @play-music="handlePlayMusic" />
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