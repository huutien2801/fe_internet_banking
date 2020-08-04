<template>
<tr>
    <td style="vertical-align: middle" class="text-center">
        {{debtObj.reminder_full_name}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        {{debtObj.reminder_account_number}}
    </td>
    <td style="vertical-align: middle" class="text-center">
        <currency-input class="ipt-balance text-center" :value="debtObj.debt" disabled v-currency="{
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
    <td class="text-center text-wrap" style="vertical-align: middle">
        <span class="btn btn-outline-danger">
            BỊ NHẮC
        </span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{debtObj.message}}</p>
    </td>

    <td class="text-center text-wrap" style="vertical-align: middle">
        <span class="btn btn-outline-success" v-if="debtObj.status == 'DONE'">
            ĐÃ THANH TOÁN
        </span>
        <span class="btn btn btn-dark" v-if="debtObj.status == 'UNDONE'">
            CHƯA THANH TOÁN
        </span>
        <span class="btn btn-outline-danger" v-if="debtObj.status == 'CANCEL'">
            ĐÃ HỦY
        </span>
    </td>
    <td class="text-center">
        <span>{{debtObj.updated_date | moment("DD/MM/YYYY")}}</span>
    </td>
</tr>
</template>

<script>
export default {
    props: {
        debtObj: Object,
    },
    data() {
        return {
            isReminder: false
        }
    },
    mounted: function () {

    },
    methods: {

    }
};
</script>

<style scoped>
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    margin-bottom: 0px;
}

.btn-outline-success {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-outline-warning {
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
}

.btn-dark {
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

.ipt-balance {
    background: transparent;
    border: none;
}
</style>
