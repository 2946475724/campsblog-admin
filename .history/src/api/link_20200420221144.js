import request from '@/utils/request'

export function getLinkList(params) {
  return request({
    url: '/link/list',
    method: 'get',
    params: params
  })
}

export function deleteLinkById(data) {
  return request({
    url: '/link/delete',
    method: 'post',
    data: QS.stringify(data)
  })
}