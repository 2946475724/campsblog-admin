import request from '@/utils/request'

export function getLinkList(params) {
  return request({
    url: '/link/list',
    method: 'get',
    params: params
  })
}