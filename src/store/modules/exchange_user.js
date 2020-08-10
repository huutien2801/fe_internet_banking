import {
    addUserToList,
    showList
} from '../../api/exchange_user_api'


const state = {

}

const getters = {

}

const mutations = {
    
}
const actions = {
    addUserToList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            addUserToList(payload.userId, payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    showList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            showList(payload.userId, payload.limit, payload.offset)
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