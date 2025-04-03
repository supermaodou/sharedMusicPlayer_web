export default {
  namespaced: true,
  state: {
    currentUser: null
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async getComputerName({ commit }) {
      try {
        const response = await fetch('/api/user/getComputerName')
        const data = await response.json()
        commit('SET_USER', data)
        return data.computerName
      } catch (error) {
        console.error('获取计算机名称失败:', error)
        return 'Unknown User'
      }
    },
    async updateUsername({ commit }, username) {
      try {
        const response = await fetch('/api/user/updateUsername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        })
        const user = await response.json()
        commit('SET_USER', user)
      } catch (error) {
        console.error('更新用户名失败:', error)
      }
    }
  }
}