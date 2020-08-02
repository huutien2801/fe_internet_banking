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

export function convertReceiverToOption(listReceiver) {
    let opts = []
    listReceiver.forEach(receiver => {
        console.log(receiver)
        let opt = {
            id: receiver.receiver_account_number,
            text: receiver.receiver_nick_name
        }
        opts.push(opt)
    });
    return opts;
}

export async function getInsideReceiverOption(){
    let payload = {
        q: {
            isInside: true
        },
        limit: 100,
        offset: 0
    }
    let respReceiver = await store.dispatch("exchangeUser/showList", payload)
    if (respReceiver && !respReceiver.error) {
        return convertReceiverToOption(respReceiver.data.users)
    }
}

export async function getOutsideReceiverOption(){
    let payload = {
        q: {
            isInside: true
        },
        limit: 100,
        offset: 0
    }
    let respReceiver = await store.dispatch("exchangeUser/showList", payload)
    if (respReceiver && !respReceiver.error) {
        return convertReceiverToOption(respReceiver.data.users)
    }
}