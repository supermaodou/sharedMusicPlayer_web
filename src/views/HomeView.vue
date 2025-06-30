<script>
import MusicPlayer from '../components/MusicPlayer.vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    MusicPlayer,
    Sidebar,
    Header
  },
  setup() {
    const route = useRoute()
    return { route }
  },
  data() {
    return {
      currentMusic: null,
      searchQuery: '',
      playlists: [
        { id: 1, name: "我喜欢的音乐", songCount: 156 },
        { id: 2, name: "华语流行", songCount: 89 },
        { id: 3, name: "欧美经典", songCount: 124 },
        { id: 4, name: "日韩热门", songCount: 67 }
      ],
      recommendations: [
        { id: 1, title: "华语流行精选", description: "最新最热华语流行歌曲", playCount: "125万", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
        { id: 2, title: "欧美热门榜", description: "Billboard热门单曲", playCount: "89万", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop" },
        { id: 3, title: "怀旧经典", description: "那些年我们听过的歌", playCount: "256万", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop" },
        { id: 4, title: "民谣精选", description: "温暖治愈的民谣时光", playCount: "67万", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" }
      ],
      recentSongs: [
        { id: 1, title: "夜曲", artist: "周杰伦", album: "十一月的萧邦", duration: "4:32", liked: true },
        { id: 2, title: "青花瓷", artist: "周杰伦", album: "我很忙", duration: "3:58", liked: false },
        { id: 3, title: "告白气球", artist: "周杰伦", album: "周杰伦的床边故事", duration: "3:32", liked: true },
        { id: 4, title: "稻香", artist: "周杰伦", album: "魔杰座", duration: "3:43", liked: false },
        { id: 5, title: "七里香", artist: "周杰伦", album: "七里香", duration: "4:15", liked: true }
      ]
    }
  },
  computed: {
    activeTab() {
      const path = this.route.path
      if (path === '/') return 'discover'
      if (path === '/fm') return 'fm'
      if (path === '/video') return 'video'
      if (path === '/friends') return 'friend'
      if (path === '/local-music') return 'local'
      return 'discover'
    }
  },
  methods: {
    handlePlayMusic(music) {
      this.currentMusic = music
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        ElMessage.info(`搜索: ${this.searchQuery}`)
      }
    }
  }
}
</script>

<template>
  <div class="music-app">
    <Sidebar :activeTab="activeTab" :playlists="playlists" />
    
    <div class="main-content">
      <Header :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" @search="handleSearch" />
      
      <div class="content-area">
        <router-view 
          :recommendations="recommendations"
          :recentSongs="recentSongs"
          @play="handlePlayMusic"
          @play-music="handlePlayMusic"
        ></router-view>
      </div>

      <MusicPlayer 
        class="player-section" 
        :currentMusic="currentMusic"
        @update-music="handlePlayMusic" 
      />
    </div>
  </div>
</template>

<style scoped>
.music-app {
  display: flex;
  height: 100vh;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  height: 100vh;
  overflow: hidden;
}

.content-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-area {
    padding: 15px;
  }
}
</style>