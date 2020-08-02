import {
    transferMoney,
    getClientInfo
} from "../../api/otp_api"


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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}