<script>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'
import PlayQueue from './PlayQueue.vue'
import { mapState } from 'vuex'

export default {
  name: 'MusicPlayer',
  components: {
    PlayQueue
  },
  props: {
    currentMusic: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      aplayer: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 70,
      isQueueDrawerVisible: false
    }
  },
  computed: {
    ...mapState('queue', ['queue'])
  },
  watch: {
    currentMusic: {
      handler(music) {
        if (music && music.url) {
          this.switchMusic(music)
        }
      },
      immediate: true
    },
    volume: {
      handler(newVolume) {
        if (this.aplayer) {
          this.aplayer.volume(newVolume / 100)
        }
      }
    }
  },
  mounted() {
    this.initAPlayer()
  },
  beforeUnmount() {
    if (this.aplayer) {
      this.aplayer.destroy()
      this.aplayer = null
    }
  },
  methods: {
    initAPlayer() {
      if (this.aplayer) {
        this.aplayer.destroy()
      }
      this.aplayer = new APlayer({
        container: this.$refs.aplayer,
        audio: this.currentMusic && this.currentMusic.url ? [this.formatMusic(this.currentMusic)] : [],
        theme: '#409EFF',
        autoplay: false,
        volume: this.volume / 100,
        preload: 'auto',
        lrcType: 0,
        mini: false
      })

      // 监听播放状态
      this.aplayer.on('play', () => {
        this.isPlaying = true
      })
      this.aplayer.on('pause', () => {
        this.isPlaying = false
      })
      this.aplayer.on('timeupdate', () => {
        this.currentTime = this.aplayer.audio.currentTime
        this.duration = this.aplayer.audio.duration
      })
      this.aplayer.on('ended', this.playNextSong)
    },
    switchMusic(music) {
      if (this.aplayer) {
        this.aplayer.list.clear()
        this.aplayer.list.add([this.formatMusic(music)])
        this.aplayer.list.switch(0)
        this.aplayer.play()
      }
    },
    formatMusic(music) {
      return {
        name: music.title || music.name || '',
        artist: music.artist || '',
        url: music.url,
        cover: music.cover || music.pic || '',
      }
    },
    togglePlay() {
      if (this.aplayer) {
        if (this.isPlaying) {
          this.aplayer.pause()
        } else {
          this.aplayer.play()
        }
      }
    },
    seekTo(time) {
      if (this.aplayer) {
        this.aplayer.seek(time)
      }
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    toggleMute() {
      if (this.aplayer) {
        if (this.volume > 0) {
          this.volume = 0
        } else {
          this.volume = 70
        }
      }
    },
    toggleQueueDrawer() {
      this.isQueueDrawerVisible = !this.isQueueDrawerVisible
    },
    handlePlayMusicFromQueue(music) {
      this.$emit('update-music', music)
      this.isQueueDrawerVisible = false
    },
    playNextSong() {
      if (!this.queue || this.queue.length === 0) {
        return; // 队列为空，不执行任何操作
      }

      // 找到当前歌曲在队列中的索引
      const currentIndex = this.queue.findIndex(item => item && this.currentMusic && item.musicId === this.currentMusic.musicId);

      if (currentIndex === -1) {
        // 如果当前歌曲不在播放列表中（例如是初次加载的歌曲），则播放列表的第一首
        if (this.queue.length > 0) {
            this.$emit('update-music', this.queue[0]);
        }
        return;
      }

      // 计算下一首歌的索引，并实现循环播放
      const nextIndex = (currentIndex + 1) % this.queue.length;
      const nextMusic = this.queue[nextIndex];

      if (nextMusic) {
        this.$emit('update-music', nextMusic);
      }
    }
  }
}
</script>

<template>
  <div class="player">
    <div class="player-info">
      <img :src="currentMusic?.cover || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=faces'" :alt="currentMusic?.title" class="player-cover">
      <div class="player-details">
        <h4>{{ currentMusic?.title || '未播放' }}</h4>
        <p>{{ currentMusic?.artist || '未知艺术家' }}</p>
      </div>
      <el-button text style="color: white; opacity: 0.8;">
        <el-icon><Star /></el-icon>
      </el-button>
    </div>

    <div class="player-controls">
      <div class="control-buttons">
        <button class="control-btn">
          <el-icon><Switch /></el-icon>
        </button>
        <button class="control-btn">
          <el-icon><Back /></el-icon>
        </button>
        <button class="control-btn play-btn" @click="togglePlay">
          <el-icon v-if="isPlaying"><VideoPause /></el-icon>
          <el-icon v-else><VideoPlay /></el-icon>
        </button>
        <button class="control-btn">
          <el-icon><Right /></el-icon>
        </button>
        <button class="control-btn">
          <el-icon><RefreshRight /></el-icon>
        </button>
      </div>

      <div class="progress-area">
        <span class="time-display">{{ formatTime(currentTime) }}</span>
        <el-slider v-model="currentTime" :max="duration" :show-tooltip="false" style="flex: 1;" @change="seekTo">
        </el-slider>
        <span class="time-display">{{ formatTime(duration) }}</span>
      </div>
    </div>

    <div class="player-extra">
      <button class="extra-btn">
        <el-icon><ChatDotRound /></el-icon>
      </button>
      <!-- 播放列表 -->
      <button class="extra-btn" @click="toggleQueueDrawer">
        <el-icon><List /></el-icon>
      </button>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button class="extra-btn" @click="toggleMute">
          <el-icon><Mute /></el-icon>
        </button>
        <el-slider v-model="volume" :max="100" :show-tooltip="false" style="width: 100px;">
        </el-slider>
      </div>
    </div>

    <!-- 隐藏的 APlayer 容器 -->
    <div ref="aplayer" style="display: none;"></div>
    
    <!-- 播放列表抽屉 -->
    <el-drawer
      v-model="isQueueDrawerVisible"
      title="播放列表"
      direction="rtl"
      :with-header="true"
      size="350px"
    >
      <play-queue @play-music="handlePlayMusicFromQueue"/>
    </el-drawer>
  </div>
</template>

<style scoped>
.player {
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: white;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 300px;
}

.player-cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.player-details h4 {
  font-size: 14px;
  margin-bottom: 4px;
}

.player-details p {
  font-size: 12px;
  opacity: 0.8;
}

.player-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn .el-icon {
  font-size: 18px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.play-btn {
  background: white;
  color: #667eea;
  padding: 12px;
}

.play-btn .el-icon {
  font-size: 24px;
}

.play-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

.progress-area {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
}

.time-display {
  font-size: 12px;
  opacity: 0.8;
}

.player-extra {
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 200px;
  justify-content: flex-end;
}

.extra-btn {
  background: none;
  border: none;
  color: white;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.extra-btn .el-icon {
  font-size: 20px;
  opacity: 0.8;
}

.extra-btn:hover .el-icon {
  opacity: 1;
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .player-info {
    min-width: auto;
  }

  .player-extra {
    min-width: auto;
  }
}
</style>
