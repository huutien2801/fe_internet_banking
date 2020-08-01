import {
    getStandarAccount,
    updatebankAccount,
    createbankAccount
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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}