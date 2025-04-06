import request from '@/utils/request'

export const getQueueList = () => {
  return request({
    url: '/api/queue/list',
    method: 'get'
  })
}

export const addToQueue = (musicId, userId) => {
  // return request({
  //   url: '/api/queue/add',
  //   method: 'post',
  //   data: JSON.stringify({ musicId, userId })
  // })
  return request({
    url: `/api/queue/add?musicId=${musicId}&userId=${userId}`,
    method: 'post'
  })
}

export const removeFromQueue = (queueId) => {
  return request({
    url: `/api/queue/remove/${queueId}`,
    method: 'delete'
  })
}

export const getCurrentPlaying = () => {
  return request({
    url: '/queue/current',
    method: 'get'
  })
}