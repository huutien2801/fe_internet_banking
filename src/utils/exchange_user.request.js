import axios from 'axios'

// create an axios instance
const exchangeUserService = axios.create({
    baseURL: 'https://ibs-api.herokuapp.com/api/v1/exchange-user',
    // baseURL: 'http://35.223.196.250:8080/api/v1/auth',// url = base url + request url
    timeout: 60000 // request timeout
})

exchangeUserService.interceptors.request.use(
    config => {
        // do something before request is sent
      
        let tokenSession = window.localStorage.getItem("ACCESS_TOKEN") || ""
        if (tokenSession) {
            config.headers.Authorization = `Bearer ${tokenSession}`
        }

        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// request interceptor
exchangeUserService.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.resolve({ error });
});

export default exchangeUserService