import DebtRequest from "../utils/debt.request"

export function createDebt(data){
    let url = `/create`
    return DebtRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getDebt(q,limit,offset){
    let url = `/get-all?q=${q}&limit=${limit}&offset=${offset}`
    return DebtRequest({
        url: url,
        method: 'get'
    })
}

export function getReminder(limit,offset){
    let url = `/reminder?limit=${limit}&offset=${offset}`
    return DebtRequest({
        url: url,
        method: 'get'
    })
}

export function getReminded(limit,offset){
    let url = `/reminded?limit=${limit}&offset=${offset}`
    return DebtRequest({
        url: url,
        method: 'get'
    })
}

export function cancelDebt(data){
    let url = `/cancel`
    return DebtRequest({
        url: url,
        method: 'put',
        data
    })
}

export function payDebt(data){
    let url = `/pay`
    return DebtRequest({
        url: url,
        method: 'post',
        data
    })
}

