export default {
  namespaced: true,
  state: {
    musicList: []
  },
  mutations: {
    SET_MUSIC_LIST(state, list) {
      state.musicList = list
    }
  },
  actions: {
    async fetchMusicList({ commit }) {
      try {
        const response = await fetch('/api/music/list')
        const data = await response.json()
        commit('SET_MUSIC_LIST', data)
      } catch (error) {
        console.error('获取音乐列表失败:', error)
      }
    },
    async addMusic({ dispatch }, musicData) {
      try {
        await fetch('/api/music/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(musicData)
        })
        await dispatch('fetchMusicList')
      } catch (error) {
        console.error('添加音乐失败:', error)
        throw error
      }
    }
  }
}