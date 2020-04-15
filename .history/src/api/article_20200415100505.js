import request from '@/utils/request'
export function getArticleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params: params
  })
}
