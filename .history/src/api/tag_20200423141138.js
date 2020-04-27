import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params: params
  })
}