<script>
import AddMusic from '../components/AddMusic.vue'
import MusicList from '../components/MusicList.vue'

export default {
  name: 'AddMusicView',
  components: {
    AddMusic,
    MusicList
  }
}
</script>

<template>
  <div class="add-music">
    <AddMusic class="add-section" />
    <MusicList class="list-section" />
  </div>
</template>

<style scoped>
.add-music {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>