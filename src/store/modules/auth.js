import { login } from "../../api/auth_api"

const state = {

}

const getters = {

}

const mutations = {

}
let LOCAL_STORED_OBJ_EXPIRED_VALUE = 60 * 60 * 1000;
const actions = {
    login({ commit }, payload) {
        return new Promise((resolve, reject) => {
            login(payload)
                .then((response) => {
                    let res = {}
                    if (response && !response.error) {
                        // khi BE trả ra 200 sẽ nhảy vào đây
                        window.localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
                        window.localStorage.setItem("REFRESH_TOKEN",response.data.refreshToken)
                        
                        res = {
                            status: "OK",
                            data: response.data.data
                        }
                    } else {
                        res.errorCode = "REQUEST_TIMEOUT"
                        res.status = "ERROR"
                    }
                    resolve(res)
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