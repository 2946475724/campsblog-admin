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
    url: '/category/getArticleCountByCategory',
    method: 'get'
  })
  
}