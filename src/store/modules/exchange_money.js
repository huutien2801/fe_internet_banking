import {
    depositMoney,
    getAllById,
    getUserLogs,
    getAllHistoryAdmin
} from "../../api/exchange_money_api"

const state = {
}

const getters = {

}

const mutations = {
    
}
const actions = {
    depositMoney({ commit }, payload) {
        return new Promise((resolve, reject) => {
            depositMoney(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getAllById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getAllById(JSON.stringify(payload.q), payload.limit, payload.offset)
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