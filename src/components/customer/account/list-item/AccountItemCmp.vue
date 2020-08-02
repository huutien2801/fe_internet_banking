<template>
  <tr>
    <th scope="row text-center" style="vertical-align: middle">1</th>
    <td style="vertical-align: middle" class="text-center">
        <p>
            {{depositAcc.account_number}}
        </p>
    </td>
    <td style="vertical-align: middle" class="text-center">
      <p>{{depositAcc.deposit}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">{{depositAcc.deposit_date  | moment("DD/MM/YYYY")}}</td>
    <td class="text-center text-wrap" style="vertical-align: middle">
      <p>{{depositAcc.redeem_date  | moment("DD/MM/YYYY")}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <p>{{ratioData[depositAcc.ratio_id - 1]}}%</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <span>{{depositAcc.redeem}}</span>
    </td>
     <td class="text-center" style="vertical-align: middle">
      <span>{{depositAcc.deposit}}</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
      <div class="dropdown">
        <button
          class="btn btn-outline-info"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" @click="onRedeem">Rút</button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
   props: {
        depositAcc: Object,
        ratioData: []
    },
    mounted: function () {
        console.log(this.employeeObj);
    },
    data() {
        return {
            genderValue: null,
            genderOptions: [],
        }
    },
    methods: {
      onRedeem: async function (obj) {
        let payload = {
          accountNumber: this.depositAcc.account_number
        }

        let curDate = new Date();
        if (this.depositAcc.redeem_date > curDate){
          let realMoney = parseInt(this.depositAcc.deposit) + parseInt(this.depositAcc.deposit / 100); 
          if (confirm(`Bạn có chắc muốn rút tiền sớm?\n Nếu rút sớm bạn sẽ chỉ nhận được ${realMoney}`)) {
            let redeemResp = await this.$store.dispatch('bankAccount/redeemDepositAccount', payload);
            if (redeemResp && !redeemResp.error){
              alert('Rút tiền tiết kiệm thành công.')
              this.$emit("onCompleteUpdate")
            }    
            
          } else {
             
          }
        } else {
          let redeemResp = await this.$store.dispatch('bankAccount/redeemDepositAccount', payload);
            if (redeemResp && !redeemResp.error){
              alert('Rút tiền tiết kiệm thành công.')
              this.$emit("onCompleteUpdate")
            }   
        }
        alert('Có lỗi hệ thống! Rút tài khoản tiết kiệm thất bại.');
      },
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
</style>