import request from '@/utils/request'
import QS from 'qs'
export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params: params
  })
}

export function deleteArticleById(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data: QS.stringify(data)
  })
}

export function getArticleById(params) {
  return request({
    url: `/article/${params}`,
    method: 'get',
  })
}

export function getArticleCategory() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}