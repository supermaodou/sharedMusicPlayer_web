<script>
import Recommendations from '../components/Recommendations.vue'
import RecentSongs from '../components/RecentSongs.vue'

export default {
  name: 'DiscoverView',
  components: {
    Recommendations,
    RecentSongs
  },
  props: {
    recommendations: {
      type: Array,
      required: true
    },
    recentSongs: {
      type: Array,
      required: true
    }
  },
  emits: ['play'],
  methods: {
    handlePlay(music) {
      this.$emit('play', music)
    }
  }
}
</script>

<template>
  <div class="discover-view">
    <div class="page-header">
      <h2>发现音乐</h2>
      <p class="description">发现更多你喜欢的音乐</p>
    </div>
    <Recommendations :recommendations="recommendations" />
    <RecentSongs :songs="recentSongs" @play="handlePlay" />
  </div>
</template>

<style scoped>
.discover-view {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  color: #666;
  font-size: 14px;
}
</style> 