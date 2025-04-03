import { createStore } from 'vuex'
import music from './modules/music'
import queue from './modules/queue'
import user from './modules/user'

export default createStore({
  modules: {
    music,
    queue,
    user
  }
})