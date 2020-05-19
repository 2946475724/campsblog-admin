import request from '@/utils/request'

export function getCategotyList(params) {
    return request({
        url: '/category/list',
        method: 'get',
        params: params
    })
}

export function getCategories() {
  return request({
    url: '/category/listAll',
    method: 'get',
  })
}

export function getArticleCountByCategory() {
  return request({
    url: '/admin/index/getArticleCountByCategory',
    method: 'get'
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data: data
  })
}

export function updateCategory(data) {
  return request({
    url: '/category/update',
    method: 'post',
    data: data
  })
}