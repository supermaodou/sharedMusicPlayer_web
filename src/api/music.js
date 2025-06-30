import request from '@/utils/request'

export const getMusicList = () => {
  return request({
    url: '/api/music/list',
    method: 'get',
  })
}

export const getMusicPage = (params) => {
  return request({
    url: '/api/music/page',
    method: 'get',
    params: {
      page: params?.page || 1,
      size: params?.size || 10
    }
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

export const scanLocalMusic = (params) => {
  return request({
    url: '/api/music/scan',
    method: 'post',
    params
  })
}

export function uploadMusic(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: '/api/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}