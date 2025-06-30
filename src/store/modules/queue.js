import { getQueueList, addToQueue, removeFromQueue } from '@/api/queue'

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
        const response = await getQueueList()
        commit('SET_QUEUE', response.data)
      } catch (error) {
        console.error('获取队列失败:', error)
      }
    },
    async addToQueue({ dispatch }, { musicId, userId }) {
      try {
        await addToQueue(musicId, userId)
        await dispatch('fetchQueue')
      } catch (error) {
        console.error('添加到队列失败:', error)
        throw error
      }
    },
    async removeFromQueue({ dispatch }, queueId) {
      try {
        await removeFromQueue(queueId)
        await dispatch('fetchQueue')
      } catch (error) {
        console.error('从队列移除失败:', error)
        throw error
      }
    }
  }
}