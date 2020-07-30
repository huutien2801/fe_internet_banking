const getters = {
    isLoadingRedirect: state => {
        return state.auth.isLoadingRedirect
    },
    myProfile: state => {
        return state.user.myProfile
    },
}

export default getters