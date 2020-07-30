import UserRequest from "../utils/user_request"

export function rechargeMoneyInAccount(data){
    let url = `/change-balance`
    return UserRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getInfoUser(){
    let url = ``
    return UserRequest({
        url: url,
        method: 'get'
    })
}

