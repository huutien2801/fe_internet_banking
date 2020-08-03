import {
    transferMoney,
    getClientInfo,
    confirmOTP,
    getClientName
} from '../../api/client_api'


const state = {

}

const getters = {

}

const mutations = {
    
}
const actions = {
    getClientInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getClientInfo(JSON.stringify(payload.q))
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    getClientName({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getClientName(payload.partnerCode, payload.accountNumber)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    transferMoney({ commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log(payload)
            transferMoney(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    confirmOTP({ commit }, payload) {
        return new Promise((resolve, reject) => {
            confirmOTP(payload.body)
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