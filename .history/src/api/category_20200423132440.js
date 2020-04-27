import request from '@/utils/request'

export function getCategotyList() {
    return request({
        url: '/category/list',
        method: 'get',
    })
}