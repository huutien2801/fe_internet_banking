<template>
<div class="row" style="margin-right:4px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-exchange-alt icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Chuyển khoản nội bộ</span>
                    <span class="sub-title">(Chuyển khoản trong nội bộ ngân hàng 3TBank)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN TÀI KHOẢN THANH TOÁN</h5>
            </div>
            <div class="col-lg-12" style="margin-top:10px">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" :value="standarAccount.account_number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số dư hiện có
                                <span style="color:red">(*)</span>
                            </label>
                            <currency-input class="ipt-balance" :value="standarAccount.balance" disabled v-currency="{
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
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Ngày mở tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <datepicker v-model="standarAccount.register_date" :bootstrap-styling="true">
                            </datepicker>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Ngày hết hạn
                                <span style="color:red">(*)</span>
                            </label>
                            <datepicker v-model="standarAccount.expired_date" :bootstrap-styling="true">
                            </datepicker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN CHUYỂN KHOẢN</h5>
            </div>
            <div class="col-lg-12" style="margin-top:10px">
                <div class="row">
                    <div class="col-lg-12 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <label for="">Chọn người nhận</label>
                        <multiselect v-model="exchangeUserValue" :options="exchangeUserOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Chọn người nhận" label="text" track-by="id" :preselect-first="false" @select="onSelectReceiver($event)" @remove="onRemoveReceiver($event)" />
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="receiverAccountNumber" @blur="onGetUserInfo" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Tên người nhận
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" v-model="receiverFullname" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tiền muốn chuyển
                                <span style="color:red">(*)</span>
                            </label>
                            <currency-input class="ipt-balance" v-model="sendMoney" v-currency="{
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

                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Nội dung chuyển tiền
                            </label>
                            <input type="text" v-model="message" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <label for="">Chọn hình thức thanh toán phí</label>
                        <multiselect v-model="feeTypeValue" :options="feeTypeOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Chọn hình thức thanh toán phí" label="text" track-by="id" :preselect-first="false" />
                    </div>
                </div>
            </div>
            <div class="col-lg-12 text-left" style="margin-bottom:10px">
                <button class="btn btn-outline-info" data-toggle="modal" data-target="#addReceiverModal">
                    <i class="fas fa-save"></i>
                    Lưu thông tin người nhận
                </button>
                <button class="btn btn-outline-danger" @click="onSendMoney" data-toggle="modal" data-target="#changePassword">
                    <i class="fas fa-paper-plane"></i>
                    Chuyển
                </button>
            </div>
        </div>
    </div>

    <!-- Modal xác nhận OTP -->
    <div class="modal fade" id="confirmOTPModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">XÁC NHẬN OTP</h5>
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
                                        MÃ OTP
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" v-model="otp" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onConfirmOTP">
                                    <i class="far fa-save"></i>
                                    Xác nhận
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

    <!-- Modal xác nhận lưu người nhận mới -->
    <div class="modal fade" id="addReceiverModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">XÁC NHẬN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-12">
                                <h6>Bạn có muốn lưu lại thông tin người nhận này cho lần gửi kế tiếp ?</h6>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập tên gợi nhớ
                                    </label>
                                    <input type="text" v-model="nickName" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-success" @click="onSaveReceiver">
                        <i class="far fa-save"></i>
                        Xác nhận
                    </button>
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
import AccountItemCmp from "./list-item/AccountItemCmp";
import {
    getFeeTypeOption,
    getInsideReceiverOption
} from '../../../utils/common'
export default {
    data: function () {
        return {
            standarAccount: {},
            receiverAccountNumber: '',
            receiverFullname: '',
            sendMoney: 0,
            message: '',
            exchangeUserOption: [],
            exchangeUserValue: null,
            feeTypeValue: null,
            feeTypeOption: [],
            otp: '',
            nickName: ''
        };
    },
    methods: {
        onGetUserInfo: async function () {

            let payload = {
                q: {
                    account_number: this.receiverAccountNumber,
                }
            }

            let respCustomerInfo = await this.$store.dispatch("userRole/getUserInfoByBankAccount", payload)
            if (respCustomerInfo && !respCustomerInfo.error) {
                alert("Lấy thông tin thành công")
                this.receiverFullname = respCustomerInfo.data.user[0].full_name
            } else {
                alert("Số tài khoản hoặc tên đăng nhập của bạn bị sai. Vui lòng nhập chính xác")
                this.receiverFullname = ''
            }
        },
        onSendMoney: async function () {
            let payload = {}

            if (this.receiverAccountNumber == '') {
                alert("Thiếu thông tin tài khoản")
                return
            }

            if (this.receiverFullname == '') {
                alert("Tên người nhận hiện đang rỗng")
                return
            }

            if (this.sendMoney <= 0) {
                alert("Số tiền chuyển tối thiểu phải lớn hơn 50,000")
                return
            }

            if (this.feeTypeValue == null || this.feeTypeValue[0] == undefined) {
                alert("Chưa chọn hình thức thanh toán chuyển khoản")
                return
            }

            if (this.message == '') {
                alert("Mời bạn nhập nội dung chuyển khoản")
                return
            }

            if (this.partnerValue != null && this.partnerValue[0] != undefined) {
                q.partnerCode = this.partnerValue[0].id
            }

            let body = {
                receiverAccountNumber: this.receiverAccountNumber,
                amount: this.sendMoney,
                feeType: this.feeTypeValue[0].id,
                message: this.message
            }

            payload.body = body
            let respChangeBalance = await this.$store.dispatch("bankAccount/transferMoney", payload)
            let addBalanceModal = document.getElementById("addBalanceModal")
            if (respChangeBalance && !respChangeBalance.error) {
                alert("Mời bạn nhập tiếp mã OTP")
                let confirmOTPModal = document.getElementById("confirmOTPModal")
                $(confirmOTPModal).modal("show")
            } else {
                alert("Hệ thống đã xảy ra lỗi. Bạn vui lòng thử lại sau")
            }
        },
        onConfirmOTP: async function () {
            if (this.otp == '') {
                alert("Chưa nhập mã OTP")
                return
            }

            let payload = {}
            let body = {
                OTP: this.otp,
            }
            payload.body = body

            let respConfirmOTP = await this.$store.dispatch("bankAccount/confirmTransfer", payload)
            if (respConfirmOTP && !respConfirmOTP.error) {
                alert("Bạn đã xác nhận thành công. Số dư đã thay đổi. Bạn vui lòng kiểm tra lại")
                let confirmOTPModal = document.getElementById("confirmOTPModal")
                $(confirmOTPModal).modal("hide")
                let respStandarAccount = await this.$store.dispatch('bankAccount/getStandarAccount', {})
                if (respStandarAccount && !respStandarAccount.error) {
                    this.standarAccount = respStandarAccount.data.data
                }
                let isExisted = this.exchangeUserOption.find(exchangeUser => {
                    return exchangeUser.id == this.receiverAccountNumber
                })

                if (isExisted == undefined) {
                    let addReceiverModal = document.getElementById('addReceiverModal')
                    $(addReceiverModal).modal('show')
                }
            } else {
                alert("Mã OTP không chính xác")
            }
        },
        onSelectReceiver: function (obj) {
            let {
                id,
                text
            } = obj
            this.receiverAccountNumber = id
            this.receiverFullname = text
        },
        onRemoveReceiver: function (obj) {
            this.receiverAccountNumber = ''
            this.receiverFullname = ''
        },
        onSaveReceiver: async function () {
            let payload = {}
            if (this.receiverAccountNumber == '') {
                alert("Chưa điền thông tin người nhận")
                return
            }
            let body = {}
            body.receiverAccountNumber = this.receiverAccountNumber
            body.isInside = true

            body.nickName = this.nickName
            payload.body = body

            let respCreateReceiver = await this.$store.dispatch("exchangeUser/addUserToList", payload)
            let addReceiverModal = document.getElementById('addReceiverModal')
            if (respCreateReceiver && !respCreateReceiver.error) {
                alert("Thêm người nhận thành công")
                this.exchangeUserOption = await getInsideReceiverOption()
            } else {
                alert("Thêm người nhận thất bại. Vui lòng thử lại sau")
            }
            $(addReceiverModal).modal('hide')
        }
    },
    components: {
        Multiselect,
        Paginate,
        AccountItemCmp,
        Datepicker
    },
    mounted: async function () {
        let respStandarAccount = await this.$store.dispatch('bankAccount/getStandarAccount', {})
        if (respStandarAccount && !respStandarAccount.error) {
            this.standarAccount = respStandarAccount.data.data
        }
        this.feeTypeOption = getFeeTypeOption()
        this.exchangeUserOption = await getInsideReceiverOption()
    }
};
</script>

<style scoped>
.container-account {
    box-shadow: 1px 0px 10px 1px #ebebeb;
    padding-top: 10px;
    padding-bottom: 5px;
    border-radius: 5px;
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

.ipt-balance {
    display: block;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
    border: 1px solid gray;
}
</style>
