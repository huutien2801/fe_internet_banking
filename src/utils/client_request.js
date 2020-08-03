import axios from 'axios'

// create an axios instance
const clientService = axios.create({
    baseURL: 'https://ibs-api.herokuapp.com/api/v1/client',
    // baseURL: 'http://35.223.196.250:8080/api/v1/auth',// url = base url + request url
    timeout: 3000000 // request timeout
})

clientService.interceptors.request.use(
    config => {
     
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
clientService.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.resolve({ error });
});

export default clientService