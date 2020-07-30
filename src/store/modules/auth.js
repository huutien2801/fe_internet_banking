import { login } from "../../api/auth_api"

const state = {
    isLoadingRedirect: false,
}

const getters = {

}

const mutations = {
    LOADING_REDIRECT: (state, loadingPage) => {
        state.isLoadingRedirect = loadingPage.isLoadingRedirect
    },
}
const actions = {
    login({ commit }, payload) {
        return new Promise((resolve, reject) => {
            login(payload)
                .then((response) => {
                    let res = {}
                    if (response && !response.error) {
                        // khi BE trả ra 200 sẽ nhảy vào đây
                        window.localStorage.setItem("ACCESS_TOKEN", response.data.token)
                        window.localStorage.setItem("REFRESH_TOKEN",response.data.refreshToken)
                        let userInfo = {
                            USER: response.data.data,
                            //STATUS: response.data.user.status,
                        }
                        window.localStorage.setItem("USER", JSON.stringify(userInfo))
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