import store from '../store/stores.js'

export function getTransationOption() {
    let opts = [
        {
            id: "INSIDE",
            text: "Nội bộ"
        },
        {
            id: "OUTSIDE",
            text: "Liên ngân hàng"
        }
    ]
    return opts
}

export function getFeeTypeOption() {
    let opts = [
        {
            id: "NOT_PAY",
            text: "Người nhận trả tiền"
        },
        {
            id: "PAY",
            text: "Người gửi trả tiền"
        }
    ]
    return opts
}

export async function getPartner() {
    let payload = {
        limit: 100,
        offset: 0,
    }
    let q = {}
    payload.q = q

    const res = await store.dispatch("userRole/getPartner", payload);

    if (res && !res.error) {
        // let partners = res.data.partners;
        return convertPartnerToOption(res.data.partners)
    }
}

export function convertPartnerToOption(listPartner) {
    let opts = []
    listPartner.forEach(partner => {
        let opt = {
            id: partner.partner_code,
            text: partner.partner_name
        }
        opts.push(opt)
    });
    return opts;
}