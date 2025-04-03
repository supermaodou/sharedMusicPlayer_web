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
      this.ws = new WebSocket('ws://localhost:8080/ws/music')

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
        this.store.dispatch('queue/updateQueue', data.queue)
        break
      case 'CURRENT_PLAYING':
        this.store.dispatch('queue/updateCurrentPlaying', data.music)
        break
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      console.error('WebSocket 未连接')
    }
  }
}

export default new WebSocketService()