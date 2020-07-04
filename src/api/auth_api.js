import authRequest from "../utils/auth_request"

export function login(data){
    let url = `/login`
    return authRequest({
        url: url,
        method: 'post',
        data
    })
}


