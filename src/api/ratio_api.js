import userRoleRequest from "../utils/ratio.request"

export function getRatio(email){
    let url = ``
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}

export function createRatio(data){
    let url = ``
    return userRoleRequest({
        url: url,
        method: 'post',
        data
    })
}

export function updateRatio(data, month){
    let url = `?month=${month}`
    return userRoleRequest({
        url: url,
        method: 'put',
        data
    })
}