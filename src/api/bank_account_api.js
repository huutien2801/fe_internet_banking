import bankAccountRequest from "../utils/bank_account.request"

export function createbankAccount(data){
    let url = `/create`
    return bankAccountRequest({
        url: url,
        method: 'post',
        data
    })
}

export function updatebankAccount(data){
    let url = `/transfer`
    return bankAccountRequest({
        url: url,
        method: 'post',
        data
    })
}

export function getStandarAccount(){
    let url = `/standard`
    return bankAccountRequest({
        url: url,
        method: 'get'
    })
}
