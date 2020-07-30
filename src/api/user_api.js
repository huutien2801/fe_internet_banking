import userRequest from "../utils/user.request"

export function rechargeMoneyInAccount(data){
    let url = `/change-balance`
    return userRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getInfoUser(){
    let url = ``
    return userRequest({
        url: url,
        method: 'get'
    })
}

export function getMe(){
    let url = `/profile`
    return userRequest({
        url: url,
        method: 'get',
    })
}

