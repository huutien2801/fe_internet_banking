import userRoleRequest from "../utils/otp.request"

export function createOTPMail(email){
    let url = `?email=` + email
    return userRoleRequest({
        url: url,
        method: 'get'
    })
}

export function confirmOTP(data){
    let url = `/confirm`
    return userRoleRequest({
        url: url,
        method: 'post',
        data
    })
}