import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params: params
  })
}

export function getTagCount() {
  return request({
    url: '/admin/index/getTagCount',
    method: 'get',
  })
}