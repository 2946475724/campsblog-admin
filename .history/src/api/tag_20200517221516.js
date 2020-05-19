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

export function addTag(data) {
  return request({
    url: '/tag/add',
    method: 'post',
    data: data
  })
}

export function updateTag(data) {
  return request({
    url: '/tag/update',
    method: 'post',
    data: data
  })
}