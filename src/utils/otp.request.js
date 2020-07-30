import axios from 'axios'

// create an axios instance
const otpService = axios.create({
    baseURL: 'https://ibs-api.herokuapp.com/api/v1/otp',
    // baseURL: 'http://35.223.196.250:8080/api/v1/auth',// url = base url + request url
    timeout: 15000 // request timeout
})

// authService.interceptors.request.use(
//     config => {
//         // do something before request is sent
//         // const token = 'bGFzdG1pbGUtZnJvbnRlbmQ6elVzSjJmOFZ3NHh0eXJ6RXp6RjUyT3diNlU2aTQ3NkM='

//         // if (token) {
//         //     config.headers.Authorization = `Basic ${token}`
//         // }
//         // let tokenSession = window.localStorage.getItem("ACCESS_TOKEN") || ""
//         // if (tokenSession) {
//         //     config.headers.Authorization = `Bearer ${tokenSession}`
//         // }

//         // return config
//     },
//     error => {
//         // do something with request error
//         return Promise.reject(error)
//     }
// )

// request interceptor
otpService.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.resolve({ error });
});

export default otpService