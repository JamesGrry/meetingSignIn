import service from '../axios.js'

/**
 * 会议列表
 * @param {*} params 
 */
export function getMeetingList(params) {
    return service.get('/api/meetingList/list', params)
}

/**
 * 会议更新信息
 * @param {*} params 
 */
export function setMeetingEdit(params) {
    return service.post('/api/meetingList/update', params)
}


/**
 * 会议删除
 * @param {*} params 
 */
export function setMeetingDelete(params) {
    return service.post('/api/meetingList/delete', params)
}

/**
 * 会议新增
 * @param {*} params 
 */
export function setMeetingSave(params) {
    return service.post('/api/meetingList/save', params)
}