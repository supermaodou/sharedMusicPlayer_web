export default {
  namespaced: true,
  state: {
    queue: [],
    currentPlaying: null,
    playingState: false,
    playProgress: 0
  },
  mutations: {
    SET_QUEUE(state, queue) {
      state.queue = queue
    },
    SET_CURRENT_PLAYING(state, music) {
      state.currentPlaying = music
    },
    SET_PLAYING_STATE(state, isPlaying) {
      state.playingState = isPlaying
    },
    SET_PLAY_PROGRESS(state, progress) {
      state.playProgress = progress
    }
  },
  actions: {
    async fetchQueue({ commit }) {
      try {
        const response = await fetch('/api/queue/list')
        const data = await response.json()
        commit('SET_QUEUE', data)
      } catch (error) {
        console.error('获取队列失败:', error)
      }
    },
    async addToQueue({ dispatch }, musicId) {
      try {
        await fetch('/api/queue/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ musicId })
        })
        await dispatch('fetchQueue')
      } catch (error) {
        console.error('添加到队列失败:', error)
        throw error
      }
    },
    async removeFromQueue({ dispatch }, queueId) {
      try {
        await fetch(`/api/queue/remove/${queueId}`, {
          method: 'DELETE'
        })
        await dispatch('fetchQueue')
      } catch (error) {
        console.error('从队列移除失败:', error)
        throw error
      }
    }
  }
}