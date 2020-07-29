import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/stores'
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
        name: "ADMIN",
        component: DashboardAdminCmp,
        meta: { requiresAuth: true, title: 'Home' },
        children: [
            {
                path: "/admin/customer",
                component: ListEmployeeCmp,
                name: "ADMIN",
            },
            {
                path: "/admin/partner",
                component: ListPartnerCmp,
                name: "ADMIN",
            },
            {
                path: "/admin/transation",
                component: ListTransactionCmp,
                name: "ADMIN",
            },
        ]
    },
    {
        path: "/employee",
        name: "EMPLOYEE",
        component: DashboardEmployeeCmp,
        meta: { requiresAuth: true, title: 'Home' },
        children: [
            {
                path: "/employee/profile",
                component: EmployeeProfileCmp,
                name: "EMPLOYEE",
            },
            {
                path: "/employee/manage-customer",
                component: ListCustomerCmp,
                name: "EMPLOYEE",
            },
            {
                path: "/employee/change-balance-customer",
                component: ChangeBalanceCustomerCmp,
                name: "EMPLOYEE",
            },
            {
                path: "/employee/receive-transaction-customer",
                component: ReceiveTransactionCustomerCmp,
                name: "EMPLOYEE",
            },
            {
                path: "/employee/send-transaction-customer",
                component: SendTransactionCustomerCmp,
                name: "EMPLOYEE",
            },
            {
                path: "/employee/dept-transaction-customer",
                component: DeptTransactionCustomerCmp,
                name: "EMPLOYEE",
            },
        ]
    },
    {
        path: "/customer",
        name: "CUSTOMER",
        component: DashboardCustomerCmp,
        meta: { requiresAuth: true, title: 'Home' },
        children: [
            {
                path: "/customer/account",
                component: ListAccountCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/profile",
                component: CustomerProfile,
                name: "CUSTOMER",
            },
            {
                path: "/customer/receiver",
                component: ListReceiverCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/transation-inside",
                component: TransationInsideCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/transation-outside",
                component: TransationOutsideCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/dept",
                component: ListDeptCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/history-receive",
                component: ListHistoryReceiveCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/history-send",
                component: ListHistorySendCmp,
                name: "CUSTOMER",
            },
            {
                path: "/customer/history-dept",
                component: ListHistoryDeptCmp,
                name: "CUSTOMER",
            },
        ]
    },
    {
        path: "/login", component: LoginCmp, name: "LOGIN"
    },
    {
        path: "/logout", component: LogoutCmp, name: "LOGOUT"
    }
]

let router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "3TBank"
    store.commit("auth/LOADING_REDIRECT", {
        isLoadingRedirect: true,
        time: 0
    })
    // store.commit("pms/CONNECT_SOCKET", {
    //   socket: socket
    // })

    let name = to.name
    if (name != "LOGIN" && name != "LOGOUT") {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!localStorage['USER'] || localStorage['USER'] === '') {
                alert("Bạn chưa đăng nhập vào hệ thống !")
                next({
                    path: '/login'
                })
            } else {
                let user = JSON.parse(localStorage['USER'])
                if (name != user.USER.role_code) {
                    alert("Bạn không có quyền truy cập vào trang này !")
                    switch (user.USER.role_code) {
                        case "EMPLOYEE":
                            next({
                                path: '/employee'
                            })
                            break;
                        case "CUSTOMER":
                            next({
                                path: '/customer'
                            })
                            break;
                        case "ADMIN":
                            next({
                                path: '/admin'
                            })
                            break;
                        default:
                            break;
                    }
                } else {
                    next()
                }
            }
        } else {
            next() // make sure to always call next()!
        }
    } else {
        next()
    }

})

export default router