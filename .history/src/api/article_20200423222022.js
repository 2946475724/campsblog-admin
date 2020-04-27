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

export function uploadImage(data) {
  return request({
    url: '/file/uploadImage',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/edit',
    method: 'post',
    data: QS.stringify(data)
  })
} 