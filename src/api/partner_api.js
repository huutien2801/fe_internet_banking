import PartnerRequest from "../utils/partner_request"

export function createPartner(data){
    let url = `/create`
    return PartnerRequest({
        url: url,
        method: 'post',
        data
    })
}

