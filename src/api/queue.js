import request from '@/utils/request'

export const getQueueList = () => {
  return request({
    url: '/api/queue/list',
    method: 'get'
  })
}

export const addToQueue = (musicId) => {
  return request({
    url: '/api/queue/add',
    method: 'post',
    data: { musicId }
  })
}

export const removeFromQueue = (id) => {
  return request({
    url: `/api/queue/remove/${id}`,
    method: 'delete'
  })
}

export const getCurrentPlaying = () => {
  return request({
    url: '/queue/current',
    method: 'get'
  })
}