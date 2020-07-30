import {
    getMe,
    getInfoUser,
    rechargeMoneyInAccount
} from "../../api/user_api"


// import {
//     createUserRole,
//     getUserRole,
//     updateUserRole,
//     deleteUserRole,
//     getPartner,
//     changePassword
// }
// from "../../api/user_role_api"

const state = {
    myProfile: {}
}

const getters = {

}

const mutations = {
    GET_MY_PROFILE: (state, profile) => {
        state.myProfile = profile
    },
}
const actions = {
    getInfoUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getInfoUser()
                .then((response) => {
                    let res = {}
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getMe({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getMe()
                .then((response) => {
                    const { data } = response;
                    commit('GET_MY_PROFILE', data.data);
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