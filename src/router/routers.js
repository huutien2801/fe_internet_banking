import Vue from 'vue'
import VueRouter from 'vue-router'

//Component
import Home from '../components/dashboard/Home'

//Auth
import LoginCmp from '../components/auth/LoginCmp'
import LogoutCmp from '../components/auth/LogoutCmp'

//Admin
import DashboardAdminCmp from "../components/admin/DashboardAdminCmp"
import ListEmployeeCmp from '../components/admin/customer/ListEmployeeCmp'
import ListPartnerCmp from '../components/admin/customer/ListPartnerCmp'
import ListTransactionCmp from '../components/admin/customer/ListTransactionCmp'

//Customer
import DashboardCustomerCmp from '../components/customer/DashboardCustomerCmp'
import ListAccountCmp from '../components/customer/account/ListAccountCmp'
import ListReceiverCmp from '../components/customer/account/ListReceiverCmp'
import ListDeptCmp from '../components/customer/account/ListDeptCmp'
import ListHistoryReceiveCmp from '../components/customer/account/ListHistoryReceiveCmp'
import ListHistorySendCmp from '../components/customer/account/ListHistorySendCmp'
import ListHistoryDeptCmp from '../components/customer/account/ListHistoryDeptCmp'
import CustomerProfile from '../components/customer/account/CustomerProfile'
import TransationInsideCmp from '../components/customer/account/TransationInsideCmp'
import TransationOutsideCmp from '../components/customer/account/TransationOutsideCmp'

//Employee
import DashboardEmployeeCmp from '../components/employee/DashboardEmployeeCmp'
import EmployeeProfileCmp from '../components/employee/account/EmployeeProfileCmp'
import ListCustomerCmp from '../components/employee/account/ListCustomerCmp'
import ChangeBalanceCustomerCmp from '../components/employee/account/ChangeBalanceCustomerCmp'
import ReceiveTransactionCustomerCmp from '../components/employee/account/ReceiveTransactionCustomerCmp'
import SendTransactionCustomerCmp from '../components/employee/account/SendTransactionCustomerCmp'
import DeptTransactionCustomerCmp from '../components/employee/account/DeptTransactionCustomerCmp'
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
        path: "/employee",
        component: DashboardEmployeeCmp,
        children: [
            {
                path: "/employee/profile",
                component: EmployeeProfileCmp
            },
            {
                path: "/employee/manage-customer",
                component: ListCustomerCmp
            },
            {
                path: "/employee/change-balance-customer",
                component: ChangeBalanceCustomerCmp
            },
            {
                path: "/employee/receive-transaction-customer",
                component: ReceiveTransactionCustomerCmp
            },
            {
                path: "/employee/send-transaction-customer",
                component: SendTransactionCustomerCmp
            },
            {
                path: "/employee/dept-transaction-customer",
                component: DeptTransactionCustomerCmp
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
            {
                path: "/customer/receiver",
                component: ListReceiverCmp
            },
            {
                path: "/customer/transation-inside",
                component: TransationInsideCmp
            },
            {
                path: "/customer/transation-outside",
                component: TransationOutsideCmp
            },
            {
                path: "/customer/dept",
                component: ListDeptCmp
            },
            {
                path: "/customer/history-receive",
                component: ListHistoryReceiveCmp
            },
            {
                path: "/customer/history-send",
                component: ListHistorySendCmp
            },
            {
                path: "/customer/history-dept",
                component: ListHistoryDeptCmp
            },
        ]
    },
    {
        path: "/login", component: LoginCmp,
    },
    {
        path: "/logout", component: LogoutCmp,
    }
]

let router = new VueRouter({
    routes: routes,
    mode: "history"
})

export default router