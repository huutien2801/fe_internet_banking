<template>
<tr v-if="isReminder == true">
    <td style="vertical-align: middle" class="text-center">
        <p>{{debtObj.reminded_full_name}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p>{{debtObj.reminded_account_number}}</p>
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
        <span class="btn btn-outline-danger">NHẮC</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{debtObj.message}}</p>
    </td>

    <td class="text-center text-wrap" style="vertical-align: middle">
        <span class="btn btn-outline-success" v-if="debtObj.status == 'DONE'">ĐÃ THANH TOÁN</span>
        <span class="btn btn btn-dark" v-if="debtObj.status == 'UNDONE'">CHƯA THANH TOÁN</span>
        <span class="btn btn-outline-danger" v-if="debtObj.status == 'CANCEL'">ĐÃ HỦY</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" :disabled="debtObj.status == 'CANCEL' || debtObj.status == 'DONE'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" data-toggle="modal" :data-target="'#confirmCancelModal'+debtObj.remind_id">Hủy nhắc nợ</button>
            </div>
        </div>
    </td>

    <!-- Modal thêm người nhận -->
    <div class="modal fade" :id="'confirmCancelModal'+debtObj.remind_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                                <h5>Bạn có chắc chắn muốn hủy nhắc nợ này?</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onCancleRemind">Hủy nhắc nợ</button>
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</tr>
<tr v-else>
    <td style="vertical-align: middle" class="text-center">
        <p>{{debtObj.reminder_full_name}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">
        <p>{{debtObj.reminder_account_number}}</p>
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
        <span class="btn btn-outline-danger">BỊ NHẮC</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{debtObj.message}}</p>
    </td>

    <td class="text-center text-wrap" style="vertical-align: middle">
        <span class="btn btn-outline-success" v-if="debtObj.status == 'DONE'">ĐÃ THANH TOÁN</span>
        <span class="btn btn-dark" v-if="debtObj.status == 'UNDONE'">CHƯA THANH TOÁN</span>
        <span class="btn btn-outline-danger" v-if="debtObj.status == 'CANCEL'">ĐÃ HỦY</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" :disabled="debtObj.status == 'CANCEL' || debtObj.status == 'DONE'" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" data-toggle="modal" :data-target="'#confirmPayModal'+debtObj.remind_id">Thanh toán nợ</button>

                <button class="dropdown-item" data-toggle="modal" :data-target="'#confirmCancelModal'+debtObj.remind_id">Hủy nhắc nợ</button>
            </div>
        </div>
    </td>

    <div class="modal fade" :id="'confirmPayModal'+debtObj.remind_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                                <h5>Bạn có chắc chắn muốn thanh toán nhắc nợ này?</h5>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">Nội dung thanh toán</label>
                                    <input type="text" v-model="message" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onGetOTPConfirm" data-dismiss="modal">Thanh toán</button>
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" :id="'confirmOTP'+debtObj.remind_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                                <div class="form-group">
                                    <label for="txt-user-name">Mã OTP</label>
                                    <input type="text" v-model="OTP" class="form-control" placeholder="Nhập mã OTP" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onPayRemind">Xác nhận</button>
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm người nhận -->
    <div class="modal fade" :id="'confirmCancelModal'+debtObj.remind_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                                <h5>Bạn có chắc chắn muốn hủy nhắc nợ này?</h5>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">Nội dung hủy nhắc nợ</label>
                                    <input type="text" v-model="message" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="onCancleRemind">Hủy nhắc nợ</button>
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</tr>
</template>

<script>
export default {
    props: {
        debtObj: Object,
        userAccountObj: Object,
    },
    data() {
        return {
            isReminder: false,
            message: "",
            OTP: "",
        };
    },
    mounted: function () {
        console.log(this.debtObj.reminder_account_number);
        console.log(this.userAccountObj.account_number);
        if (
            this.debtObj.reminder_account_number !=
            parseInt(this.userAccountObj.account_number)
        ) {
            this.isReminder = false;
        } else {
            this.isReminder = true;
        }
    },
    methods: {
        onCancleRemind: async function () {
            let payload = {
                body: {
                    remindId: this.debtObj.remind_id,
                    message: this.message != "" ?
                        this.message : `STK ${this.debtObj.reminded_account_number} ${this.debtObj.reminded_full_name} vừa thanh toán nợ ${this.debtObj.debt} cho bạn`,
                },
            };

            let respCancel = await this.$store.dispatch("debt/cancelDebt", payload);
            if (respCancel && !respCancel.error) {
                alert("Hủy nhắc nợ thành công");
                this.$emit("onCompleteUpdateDebt");
            } else {
                alert("Hủy nhắc nợ thất bại. Vui lòng thử lại sau");
            }
        },
        onPayRemind: async function () {
            let userSt = JSON.parse(window.localStorage.getItem("USER"));
            let payloadConfirmOTP = {
                body: {
                    email: userSt.USER.email,
                    OTP: this.OTP
                }
            }
            const res = await this.$store.dispatch("otp/confirmOTP", payloadConfirmOTP);
            if (res && !res.error) {
                let payload = {
                    body: {
                        remindId: this.debtObj.remind_id,
                        message: this.message != "" ?
                            this.message : `STK ${this.debtObj.reminded_account_number} ${this.debtObj.reminded_full_name} vừa thanh toán nợ ${this.debtObj.debt} cho bạn`,
                    },
                };

                let respPay = await this.$store.dispatch("debt/payDebt", payload);
                if (respPay && !respPay.error) {

                    alert("Thanh toán nhắc nợ thành công");
                    let confirmOTPModal = document.getElementById(`confirmOTP${this.debtObj.remind_id}`)
                    $(confirmOTPModal).modal("hide")

                    this.$emit("onCompleteUpdateDebt");
                } else {
                    alert("Thanh toán nợ thất bại. Vui lòng thử lại sau");
                }
            } else {
                alert('Nhập sai mã PIN vui lòng kiểm tra email và nhập lại');
            }

        },
        onGetOTPConfirm: async function () {
            let confirmOTPModal = document.getElementById(`confirmOTP${this.debtObj.remind_id}`)
            $(confirmOTPModal).modal("show")
            let userSt = JSON.parse(window.localStorage.getItem("USER"));
            let payload = {
                email: userSt.USER.email,
            };
            const res = await this.$store.dispatch("otp/createOTPMail", payload);
            if (res && !res.error) {
                document.getElementById("otp-email").style.display = "none";
                document.getElementById("update-pwd").style.display = "block";
            }
        }
    },
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
