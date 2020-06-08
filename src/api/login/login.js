import service from '../axios.js'

/**
 * 请求登录
 * @param {*} params 
 */
export function getArchivesList(params) {
    return service.post('/api/login', params)
}