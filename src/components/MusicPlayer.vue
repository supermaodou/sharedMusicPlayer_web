<script>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

export default {
  name: 'MusicPlayer',
  props: {
    currentMusic: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      aplayer: null,
      localFileUrl: null
    }
  },
  watch: {
    currentMusic: {
      handler(music) {
        if (music && music.url) {
          this.switchMusic(music)
        }
      },
      immediate: true
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
        autoplay: true,
        volume: 0.7,
        preload: 'auto',
        lrcType: 0,
        mini: false
      })
      // 监听事件可在此添加
    },
    switchMusic(music) {
      if (this.aplayer) {
        this.aplayer.list.clear()
        this.aplayer.list.add([this.formatMusic(music)])
        this.aplayer.list.switch(0)
        this.aplayer.play()
      }
    },
    handleLocalFile(e) {
      const file = e.target.files[0]
      if (file) {
        this.localFileUrl = URL.createObjectURL(file)
        const music = {
          title: file.name,
          artist: '本地音乐',
          url: this.localFileUrl
        }
        this.switchMusic(music)
      }
    },
    formatMusic(music) {
      return {
        name: music.title || music.name || '',
        artist: music.artist || '',
        url: music.url,
        cover: music.cover || music.pic || '',
      }
    }
  }
}
</script>

<template>
  <div class="music-player">
    <div ref="aplayer"></div>
    <div style="margin-top: 12px; text-align: right;">
      <input type="file" accept="audio/*" @change="handleLocalFile" style="display: inline-block;" />
    </div>
  </div>
</template>

<style scoped>
.music-player {
  max-width: 600px;
  margin: 0 auto;
}
</style>
