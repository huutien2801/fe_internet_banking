<template>
<tr>

    <td style="vertical-align: middle" class="text-center">
        <p>
            {{historyObj.sender_account_number}}
        </p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p>La Thoại</p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p v-if="historyObj.is_inside == true">3TBank</p>
        <p v-else>{{historyObj.partner_code}}</p>
    </td>
    <td class="text-center text-wrap" style="vertical-align: middle">
        <currency-input class="ipt-balance" :value="historyObj.money" disabled v-currency="{
    currency: {
        suffix:' VNĐ'
    },
    valueAsInteger: false,
    distractionFree: true,
    precision: 1,
    autoDecimalMode: true,
    valueRange: { min: 0 },
    allowNegative: false
  }" />
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{historyObj.send_date | moment("DD/MM/YYYY")}}</p>
    </td>
    <td class="text-center text-wrap" style="vertical-align: middle">
        <p>Chuyển rồi đó bạn ơi. Check dùm mình nhé</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Chi tiết</button>
            </div>
        </div>
    </td>
</tr>
</template>

<script>
export default {
    props: {
        historyObj: Object
    }
};
</script>

<style scoped>
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350px;
    margin-bottom: 0px;
}

.btn-outline-success {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-outline-danger {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-outline-info {
    font-size: 12px;
}

h6 {
    font-size: 13px;
}

td {
    font-size: 13px;
}

th {
    font-size: 13px;
}

.dropdown-item {
    font-size: 13px;
}

.ipt-balance{
    background: transparent;
    border: none;
}
</style>
