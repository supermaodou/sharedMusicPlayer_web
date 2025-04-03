import request from '@/utils/request'

export const getMusicList = () => {
  return request({
    url: '/api/music/list',
    method: 'get'
  })
}

export const addMusic = (data) => {
  return request({
    url: '/api/music/add',
    method: 'post',
    data
  })
}

export const deleteMusic = (id) => {
  return request({
    url: `/api/music/delete/${id}`,
    method: 'delete'
  })
}