import request from '@/utils/request'

export function getSysLogList() {
  return request({
    url: '/log/list',
    method: 'get',
  })
}