import request from '@/utils/request'

export function getLinkList() {
  return request({
    url: '/link/list',
    method: 'get',
  })
}