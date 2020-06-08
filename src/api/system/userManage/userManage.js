import service from '../../axios.js'

/**
 * 会议列表
 * @param {*} params 
 */
export function getMeetingList(params) {
    return service.get('/api/meetingList', params)
}

/**
 * 会议列表
 * @param {*} params 
 */
export function getUserList(params) {
    return service.get('/api/meetingAdminUser/list', params)
}

/**
 * 会议列表
 * @param {*} params 
 */
export function setSaveUser(params) {
    return service.post('/api/meetingAdminUser/save', params)
}

/**
 * 编辑用户
 * @param {*} params 
 */
export function setEditUserInfo(params) {
    return service.post('/api/meetingAdminUser/update', params)
}

/**
 * 删除用户
 * @param {*} params 
 */
export function setDeleteUser(params) {
    return service.get('/api/meetingAdminUser/delete', params)
}


/**
 * 权限列表
 * @param {*} params 
 */
export function getRole(params) {
    return service.get('/api/meetingAdminUser/role', params)
}
