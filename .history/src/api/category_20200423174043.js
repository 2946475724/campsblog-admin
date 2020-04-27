import request from '@/utils/request'

export function getCategotyList(params) {
    return request({
        url: '/category/list',
        method: 'get',
        params: params
    })
}