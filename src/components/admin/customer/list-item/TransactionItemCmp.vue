<template>
<tr>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.partner_code}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.partner_name}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.sender_account_number}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.receiver_account_number}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.sender_full_name}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.receiver_full_name}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.money}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{historyObj.send_date | moment("DD/MM/YYYY HH:mm:ss")}}
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
    max-width: 300px;
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
</style>
