import service from '../axios.js'

/**
 * 会议列表
 * @param {*} params 
 */
export function getMeetingList(params) {
    return service.get('/api/meetingList/list', params)
}

/**
 * 签到列表
 * @param {*} params 
 */
export function getSginInList(params) {
    return service.get('/api/getSiginInList', params)
}
