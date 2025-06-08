import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import LocalMusicView from '../views/LocalMusicView.vue'
import FMView from '../views/FMView.vue'
import VideoView from '../views/VideoView.vue'
import FriendsView from '../views/FriendsView.vue'
import DiscoverView from '../views/DiscoverView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'discover',
        component: DiscoverView
      },
      {
        path: 'local-music',
        name: 'local-music',
        component: LocalMusicView
      },
      {
        path: 'fm',
        name: 'fm',
        component: FMView
      },
      {
        path: 'video',
        name: 'video',
        component: VideoView
      },
      {
        path: 'friends',
        name: 'friends',
        component: FriendsView
      }
    ]
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router