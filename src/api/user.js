import request from '@/utils/request'

export const getComputerName = () => {
  return request({
    url: '/api/user/computer-name',
    method: 'get'
  })
}

export const updateUsername = (username) => {
  return request({
    url: '/api/user/update-username',
    method: 'post',
    data: { username }
  })
}