<script>
import VueAplayer from 'vue3-aplayer'

export default {
  name: 'MusicPlayer',
  components: { VueAplayer },
  props: {
    currentMusic: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      aplayerMusic: null,
      aplayerList: [],
      localFileUrl: null
    }
  },
  watch: {
    currentMusic: {
      handler(music) {
        console.log("music");
        if (music && music.url) {
          this.aplayerMusic = {
            title: music.title || '',
            artist: music.artist || '',
            url: music.url,
            cover: music.cover || music.pic || ''
          }
          this.aplayerList = [this.aplayerMusic]
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLocalFile(e) {
      const file = e.target.files[0]
      if (file) {
        this.localFileUrl = URL.createObjectURL(file)
        this.aplayerMusic = {
          title: file.name,
          artist: '本地音乐',
          url: this.localFileUrl
        }
        this.aplayerList = [this.aplayerMusic]
      }
    },
    onPlay() { },
    onPause() { },
    onEnded() { }
  }
}
</script>

<template>
  <div class="music-player">
    <vue-aplayer :music="aplayerMusic" :list="aplayerList" :show-lrc="false" :mini="false" :autoplay="true"
      :theme="'#409EFF'" :preload="'auto'" :volume="0.7" @play="onPlay" @pause="onPause" @ended="onEnded"
      style="border-radius: 12px; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);" />
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
