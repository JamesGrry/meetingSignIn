import service from '../axios.js'

/**
 * 签到列表
 * @param {*} params 
 */
export function getSignInList(params) {
    return service.get('/api/SignIn/list', params)
}

/**
 * 签到更新
 * @param {*} params 
 */
export function setSignInEdit(params) {
    return service.post('/api/SignIn/update', params)
}


/**
 * 签到记录删除
 * @param {*} params 
 */
export function setSignInDelete(params) {
    return service.post('/api/SignIn/delete', params)
}

/**
 * 新增签到
 * @param {*} params 
 */
export function setSignInSave(params) {
    return service.post('/api/SignIn/save', params)
}

/**
 * 会议列表
 * @param {*} params 
 */
export function getMeetingList(params) {
    return service.get('/api/meetingList/list', params)
}