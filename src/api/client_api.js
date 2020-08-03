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

export function getClientName(partnerCode, accountNumber){
    let url = `/get-name?partnerCode=${partnerCode}&accountNumber=${accountNumber}`
    return clientRequest({
        url: url,
        method: 'get'
    })
}

export function confirmOTP(data){
    let url = `/confirm-otp`
    return clientRequest({
        url: url,
        method: 'post',
        data
    })
}