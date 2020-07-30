
import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)

//Import state, getter,....
// import state from "./state";
import getters from "./gettters";
// import mutations from "./mutations.js";
// import actions from "./actions.js";

//Import modules
import authModule from "./modules/auth"
import userRoleModule from "./modules/user_role"
import userModule from './modules/user'
import exchangeMoneyModule from './modules/exchange_money'

export default new Vuex.Store({
    // state,
    // mutations,
    // actions,
    getters,
    modules: {
        auth: authModule,
        userRole: userRoleModule,
        user: userModule,
        exchangeMoney: exchangeMoneyModule
    }
});