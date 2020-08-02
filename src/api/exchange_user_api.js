import ExchangeUserRequest from "../utils/exchange_user.request"

export function addUserToList(data){
    let url = `/add-user`
    return ExchangeUserRequest({
        url: url,
        method: 'post',
        data
    })
}

export function showList(q,limit,offset){
    let url = `/show-user?q=${q}&limit=${limit}&offset=${offset}`
    return ExchangeUserRequest({
        url: url,
        method: 'get'
    })
}
