import ExchangeUserRequest from "../utils/exchange_user_request"

export function addUserToList(data){
    let url = `/add-user`
    return ExchangeUserRequest({
        url: url,
        method: 'post',
        data
    })
}

export function showList(limit,offset){
    let url = `/show-user?limit=${limit}&offset=${offset}`
    return ExchangeUserRequest({
        url: url,
        method: 'get'
    })
}
