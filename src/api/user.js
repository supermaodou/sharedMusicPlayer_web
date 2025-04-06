import request from '@/utils/request'

export const getComputerName = () => {
  return request({
    url: '/api/user/getComputerName',
    method: 'get'
  })
}

export const updateUsername = (userId, newUsername) => {
  return request({
    url: '/api/user/updateUsername',
    method: 'post',
    data: { userId, newUsername }
  })
}