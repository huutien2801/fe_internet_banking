import { createUserRole,getUserRole } from "../../api/user_role_api"

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
                    console.log(response)
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

    getUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            getUserRole(payload.roleCode)
                .then((response) => {
                    let res = {}
                    console.log(response)
              
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