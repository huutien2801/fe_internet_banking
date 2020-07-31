import {
    createOTPMail,
    confirmOTP
} from "../../api/otp_api"


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

}

const getters = {

}

const mutations = {
    
}
const actions = {
    createOTPMail({ commit }, payload) {
        return new Promise((resolve, reject) => {
            createOTPMail(payload.email)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    confirmOTP({ commit }, payload) {
        return new Promise((resolve, reject) => {
            confirmOTP(payload)
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