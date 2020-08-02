import clientRequest from "../utils/client_request.js"

export function transferMoney(data){
    let url = `/transfer-money`
    return clientRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getClientInfo(q){
    let url = `/get-info?q=${q}`
    return clientRequest({
        url: url,
        method: 'get'
    })
}