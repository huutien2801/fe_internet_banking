import {
    createUserRole,
    getUserRole,
    updateUserRole,
    deleteUserRole,
    getPartner,
    changePassword,
    getUserInfoByBankAccount,
    resetPassword
}
from "../../api/user_role_api"

const state = {

}

const getters = {

}

const mutations = {

}
let LOCAL_STORED_OBJ_EXPIRED_VALUE = 60 * 60 * 1000;
const actions = {
    createUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            createUserRole(payload)
                .then((response) => {
                    let res = {}
                    // if (response && !response.error) {
                    //     // khi BE trả ra 200 sẽ nhảy vào đây
                    //     res = {
                    //         status: "OK",
                    //         data: response.data.data
                    //     }
                    // } else {
                    //     res.errorCode = "REQUEST_TIMEOUT"
                    //     res.status = "ERROR"
                    // }
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    changePassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            console.log(payload)
            changePassword(payload.body)
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    updateUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            updateUserRole(payload.userId, payload.body)
                .then((response) => {
                    let res = {}
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    deleteUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            deleteUserRole(payload.userId)
                .then((response) => {
                    let res = {}
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getUserRole(JSON.stringify(payload.q), payload.limit, payload.offset)
                .then((response) => {
                    let res = {}

                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    getUserInfoByBankAccount({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getUserInfoByBankAccount(JSON.stringify(payload.q))
                .then((response) => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    getPartner({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getPartner(JSON.stringify(payload.q), payload.limit, payload.offset)
                .then((response) => {
                    let res = {}

                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    resetPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
            resetPassword(payload)
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