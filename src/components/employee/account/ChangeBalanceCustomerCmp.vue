<template>
<div class="row" style="margin-right:5px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Thay đổi số dư</span>
                    <span class="sub-title">(Trang nạp tiền vào tài khoản của khách hàng 3TBank)</span>
                </div>
            </div>
        </div>

    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>NHẬP THÔNG TIN TÀI KHOẢN KHÁCH HÀNG</h5>
            </div>
            <div class="col-lg-12" style="margin-top:10px">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="number" v-model="bankAccount" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Tên đăng nhập
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="username" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button class="btn btn-primary" @click="onGetCustomerInfo">
                            LẤY THÔNG TIN
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" v-if="isShown == true" style="margin-top:20px">
        <div class="row container-account" style="padding-top:20px">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN TÀI KHOẢN</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="number" v-model="bankAccount" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Họ tên khách hàng
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="customerInfo.full_name" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                CMND
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="customerInfo.identity_number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                 
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Email
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="customerInfo.email" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Ngày tháng năm sinh
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="customerInfo.dob" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Điện thoại
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="number" v-model="customerInfo.phone" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Địa chỉ
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="customerInfo.address" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button class="btn btn-primary"  data-toggle='modal' data-target="#addBalanceModal">
                            TIẾN HÀNH NẠP TIỀN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="addBalanceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">NẠP TIỀN VÀO TÀI KHOẢN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập số tiền muốn nạp
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <currency-input class="ipt-balance" v-model="balance" v-currency="{
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
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onChangeBalanceCustomer">
                                    <i class="far fa-save"></i>
                                    NẠP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
export default {
    data: function () {
        return {
            bankAccount: '',
            username: '',
            isShown: false,
            customerInfo: {},
            balance: 0
        };
    },
    methods: {
        onGetCustomerInfo: async function () {
            if (this.bankAccount == '' ) {
                alert("Chưa nhập số tài khoản")
                return
            }

            if (this.username == '') {
                alert("Chưa nhập tên đăng nhập của khách hàng")
                return
            }

            let payload = {
                q: {
                    account_number: this.bankAccount,
                    username: this.username
                }
            }

            let respCustomerInfo = await this.$store.dispatch("userRole/getUserInfoByBankAccount", payload)

            if (respCustomerInfo && !respCustomerInfo.error) {
                console.log(respCustomerInfo)
                this.customerInfo = respCustomerInfo.data.user[0]
                this.isShown = true
            }else{
                alert("Số tài khoản hoặc tên đăng nhập của bạn bị sai. Vui lòng nhập chính xác")
                this.isShown = false
            }
        },
        getFeeType: function () {
            let feeTypeOpts = [{
                    id: 'RECEIVER',
                    text: "Người nhận trả tiền"
                },
                {
                    id: 'SENDER',
                    text: "Người gửi trả tiền"
                }
            ]
            return feeTypeOpts
        },
        onChangeBalanceCustomer: async function(){
            let payload = {}

            if(this.bankAccount == ''){
                alert("Thiếu thông tin tài khoản")
                return
            }
            if(this.username == ''){
                alert("Thiếu thông tin tên đăng nhập")
                return
            }
            if(this.balance == 0){
                alert("Chưa nhập số tiền muốn nạp")
                return
            }

            let body = {
                accountNumber: this.bankAccount,
                username: this.username,
                money: this.balance,
                feeType: "RECEIVER"
            }

            payload.body = body
            let respChangeBalance = await this.$store.dispatch("exchangeMoney/depositMoney", payload)
            let addBalanceModal = document.getElementById("addBalanceModal")
            if(respChangeBalance && !respChangeBalance.error){
                alert("Nạp tiền vào tài khoản thành công. Bạn vui lòng kiểm tra lại số dư")
            }else{
                alert("Hệ thống đã xảy ra lỗi. Bạn vui lòng thử lại sau")
            }
            $(addBalanceModal).modal("hide")
        }
    },
    components: {
        Multiselect,
        Paginate,
        Datepicker
    }
};
</script>

<style scoped>
.ipt-balance {
    display: block;
    padding: 5px;
    border-radius: 5px;
}

.container-account {
    box-shadow: 1px 0px 10px 1px #ebebeb;
    padding-top: 10px;
    border-radius: 5px;
    padding-bottom: 10px;
}

.header-title {
    display: inline-flex;
    flex-direction: column;
}

.icon-title {
    font-size: 48px;
}

.main-title {
    font-size: 20px;
    text-transform: uppercase;
}

.sub-title {
    font-size: 15px;
}
</style>
