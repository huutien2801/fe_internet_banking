import ExchangeMoneyRequest from "../utils/exchange_money.request"

export function getAllById(q,limit,offset){
    let url = `/history?q=${q}&limit=${limit}&offset=${offset}`
    return ExchangeMoneyRequest({
        url: url,
        method: 'get'
    })
}

export function getAllReceiver(q,limit,offset){
    let url = `/receiver?q=${q}&limit=${limit}&offset=${offset}`
    return ExchangeMoneyRequest({
        url: url,
        method: 'get'
    })
}

export function getAllSender(q,limit,offset){
    let url = `/sender?q=${q}&limit=${limit}&offset=${offset}`
    return ExchangeMoneyRequest({
        url: url,
        method: 'get'
    })
}

export function depositMoney(data){
    let url = `/deposit`
    return ExchangeMoneyRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getUserLogs(limit,offset){
    let url = `/get-userlogs?limit=${limit}&offset=${offset}`
    return ExchangeMoneyRequest({
        url: url,
        method: 'get'
    })
}

export function getAllHistoryAdmin(q,limit,offset){
    let url = `/get-history-admin?q=${q}&limit=${limit}&offset=${offset}`
    return ExchangeMoneyRequest({
        url: url,
        method: 'get'
    })
}