import request from '@/utils/request'

export function getSysLogList(params) {
  return request({
    url: '/log/list',
    method: 'post',
    params: params
  })
}