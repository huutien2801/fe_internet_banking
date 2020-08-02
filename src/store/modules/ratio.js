import {
    getRatio,
    createRatio,
    updateRatio
} from "../../api/ratio_api"


const state = {

}

const getters = {

}

const mutations = {
    
}
const actions = {
    getRatio({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getRatio()
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    createRatio({ commit }, payload) {
        return new Promise((resolve, reject) => {
            createRatio(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    updateRatio({ commit }, payload) {
        return new Promise((resolve, reject) => {
            updateRatio(payload.body)
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