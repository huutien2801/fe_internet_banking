import {
    getStandarAccount,
    updatebankAccount,
    createbankAccount,
    getDepositAccount,
    redeemDepositAccount,
    transferMoney,
    confirmTransfer
} from "../../api/bank_account_api"


const state = {

}

const getters = {

}

const mutations = {
    
}
const actions = {
    getStandarAccount({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getStandarAccount()
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    createbankAccount({ commit }, payload){
        return new Promise((resolve, reject) => {
            createbankAccount(payload)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getDepositAccount({ commit }, payload){
        return new Promise((resolve, reject) => {
            getDepositAccount(payload.limit, payload.offset, payload.accountNumber)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    redeemDepositAccount({ commit }, payload){
        return new Promise((resolve, reject) => {
            redeemDepositAccount(payload)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    transferMoney({ commit }, payload) {
        return new Promise((resolve, reject) => {
            transferMoney(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    confirmTransfer({ commit }, payload) {
        return new Promise((resolve, reject) => {
            confirmTransfer(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}