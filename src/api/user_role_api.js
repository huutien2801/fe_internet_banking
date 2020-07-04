import userRoleRequest from "../utils/user_role_request"

export function createUserRole(data){
    let url = `/create`
    return userRoleRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getUserRole(roleCode){
    let url = `/get-info?roleCode=${roleCode}`
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}
