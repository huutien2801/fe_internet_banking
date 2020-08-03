<template>
<tr v-if="isReminder == false">
    <td style="vertical-align: middle" class="text-center">
        <p>
            {{debtObj.reminded_full_name}}
        </p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p> {{debtObj.reminded_account_number}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <currency-input class="ipt-balance" :value="debtObj.debt" disabled v-currency="{
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
            NHẮC
        </span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{debtObj.message}}</p>
    </td>

    <td class="text-center text-wrap" style="vertical-align: middle">
        <span class="btn btn-outline-success" v-if="debtObj.status == 'DONE'">
            ĐÃ THANH TOÁN
        </span>
        <span class="btn btn-outline-success" v-if="debtObj.status == 'UNDONE'">
            CHƯA THANH TOÁN
        </span>
        <span class="btn btn-outline-success" v-if="debtObj.status == 'CANCEL'">
            ĐÃ HỦY
        </span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Hủy nhắc nợ</button>
            </div>
        </div>
    </td>
</tr>
</template>

<script>
export default {
    props: {
        debtObj: Object,
        userAccountObj: Object
    },
    data() {
        return {
            isReminder: false
        }
    },
    mounted: function () {
        if (debtObj.reminded_account_number != parseInt(userAccountObj.account_number)) {
            this.isReminder = true
        } else {
            this.isReminder = false
        }
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
