import Vue from 'vue'
import VueRouter from 'vue-router'

//Component
import Home from '../components/dashboard/Home'


//Admin
import DashboardAdminCmp from "../components/admin/DashboardAdminCmp"
import ListEmployeeCmp from '../components/admin/customer/ListEmployeeCmp'
import ListPartnerCmp from '../components/admin/customer/ListPartnerCmp'
import ListTransactionCmp from '../components/admin/customer/ListTransactionCmp'

//Customer
import DashboardCustomerCmp from '../components/customer/DashboardCustomerCmp'
import ListAccountCmp from '../components/customer/account/ListAccountCmp'
import CustomerProfile from '../components/customer/account/CustomerProfile'
Vue.use(VueRouter)


let routes = [
    {
        path: "/", component: Home,
    },
    {
        path: "/admin",
        component: DashboardAdminCmp,
        children: [
            {
                path: "/admin/customer",
                component: ListEmployeeCmp
            },
            {
                path: "/admin/partner",
                component: ListPartnerCmp
            },
            {
                path: "/admin/transation",
                component: ListTransactionCmp
            },
        ]
    },
    {
        path: "/customer",
        component: DashboardCustomerCmp,
        children: [
            {
                path: "/customer/account",
                component: ListAccountCmp
            },
            {
                path: "/customer/profile",
                component: CustomerProfile
            },
        ]
    },
]

let router = new VueRouter({
    routes: routes,
    mode: "history"
})

export default router