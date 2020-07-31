import userRoleRequest from "../utils/user_role_request"

export function createUserRole(data){
    let url = `/create`
    return userRoleRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getUserRole(q,limit,offset){
    let url = `/get-info?q=${q}&limit=${limit}&offset=${offset}`
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}

export function getUserInfoByBankAccount(q){
    let url = `/get-info-user-by?q=${q}`
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}

export function updateUserRole(userId,data){
    let url = `/update?userId=${userId}`
    return userRoleRequest({
        url: url,
        method: 'put',
        data
    })
}

export function deleteUserRole(userId){
    let url = `/delete?userId=${userId}`
    return userRoleRequest({
        url: url,
        method: 'delete'
    })
}

export function getPartner(q,limit,offset){
    let url = `/get-partner?q=${q}&limit=${limit}&offset=${offset}`
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}

export function changePassword(data){
    console.log(data)
    let url = `/change-password`
    return userRoleRequest({
        url: url,
        method: 'post',
        data
    })
}

