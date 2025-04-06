import { useStore } from 'vuex'

class WebSocketService {
  constructor() {
    this.ws = null
    this.store = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
  }

  init(store) {
    this.store = store
    this.connect()
  }

  connect() {
    try {
      this.ws = new WebSocket('ws://localhost:8088/ws/music')

      this.ws.onopen = () => {
        console.log('WebSocket 连接成功')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.handleMessage(data)
      }

      this.ws.onclose = () => {
        console.log('WebSocket 连接关闭')
        this.reconnect()
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket 错误:', error)
      }
    } catch (error) {
      console.error('WebSocket 连接失败:', error)
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`尝试重新连接... 第 ${this.reconnectAttempts} 次`)
        this.connect()
      }, 3000)
    }
  }

  handleMessage(data) {
    switch (data.type) {
      case 'QUEUE_UPDATE':
        // 播放队列更新
        this.store.commit('queue/SET_QUEUE', data.queue)
        break
      case 'CURRENT_PLAYING':
        // 当前播放歌曲更新
        this.store.commit('queue/SET_CURRENT_PLAYING', data.music)
        break
      case 'PLAY_STATE':
        // 播放状态更新（播放/暂停）
        this.store.commit('queue/SET_PLAYING_STATE', data.isPlaying)
        break
      case 'PLAY_PROGRESS':
        // 播放进度更新
        this.store.commit('queue/SET_PLAY_PROGRESS', data.progress)
        break
      case 'MUSIC_LIST_UPDATE':
        // 音乐列表更新
        this.store.commit('music/SET_MUSIC_LIST', data.musicList)
        break
    }
  }

  // 发送播放进度
  sendPlayProgress(progress) {
    this.send(JSON.stringify({
      type: 'PLAY_PROGRESS',
      progress
    }))
  }

  // 发送播放状态
  sendPlayState(isPlaying) {
    this.send(JSON.stringify({
      type: 'PLAY_STATE',
      isPlaying
    }))
  }

  // 发送歌曲结束信号
  sendSongEnded() {
    this.send(JSON.stringify({
      type: 'SONG_ENDED'
    }))
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(typeof message === 'string' ? message : JSON.stringify(message))
    } else {
      console.error('WebSocket 未连接')
    }
  }
}

export default new WebSocketService()