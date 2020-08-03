import {
    createDebt,
    getDebt
} from '../../api/debt_api'


const state = {

}

const getters = {

}

const mutations = {
    
}
const actions = {
    createDebt({ commit }, payload) {
        return new Promise((resolve, reject) => {
            createDebt(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getDebt({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getDebt(JSON.stringify(payload.q), payload.limit, payload.offset)
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