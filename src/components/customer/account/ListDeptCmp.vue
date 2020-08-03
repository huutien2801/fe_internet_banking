<template>
<div class="row" style="margin-right:3px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách nhắc nợ</span>
                    <span class="sub-title">(Quản lý danh sách nhắc nợ của bạn)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account" style="padding-top:10px;padding-bottom:0px">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN NHẮC NỢ</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row" style="margin-bottom:20px">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <multiselect v-model="deptTypeValue" :options="deptTypeOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc loại nhắc nợ" label="text" track-by="id" :preselect-first="false" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <multiselect v-model="deptStatusValue" :options="deptStatusOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc trạng thái nhắc nợ" label="text" track-by="id" :preselect-first="false" />
                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-outline-info" @click="onFilterRemind"> LỌC</button>
                    </div>
                    <div class="col-lg-4 text-right">
                        <button class="btn btn-outline-info" data-toggle="modal" data-target="#addEmployeeModal">
                            <i class="fas fa-plus-circle"></i>
                            Thêm nhắc nợ
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 table-responsive-md">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">Họ tên</th>
                            <th scope="col" class="text-center">Số tài khoản</th>
                            <th scope="col" class="text-center">Số tiền nợ</th>
                            <th class="text-center" scope="col">Loại nhắc nợ</th>
                            <th class="text-center" scope="col">Nội dung</th>
                            <th class="text-center" scope="col">Trạng thái</th>
                            <th class="text-center" scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DeptItemCmp v-for="debt in listDebt" :key='debt._id' :debtObj='debt' :userAccountObj='standarAccount' />
                    </tbody>
                </table>
            </div>
            <div class="col-12 text-center" style="margin-top:20px">
                <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index">
                </paginate>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM NHẮC NỢ</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 col-sm-12" style="margin-bottom: 20px">
                                <label for="">Chọn người bị nhắc nợ</label>
                                <multiselect v-model="exchangeUserValue" :options="exchangeUserOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Chọn người nhận" label="text" track-by="id" :preselect-first="false" @select="onSelectReceiver($event)" @remove="onRemoveReceiver($event)" />
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số tài khoản người bị nhắc
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" v-model="remindedAccount" @blur="onGetUserInfo" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Tên người bị nhắc
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" v-model="remindedName" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số tiền muốn nhắc
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <currency-input class="ipt-balance" v-model="debt" v-currency="{
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
                                        Nội dung nhắc nợ
                                    </label>
                                    <input type="text" v-model="mess" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onCreateRemind">
                                    <i class="far fa-save"></i>
                                    Tạo nhắc nợ
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
import AccountItemCmp from "./list-item/AccountItemCmp";
import DeptItemCmp from './list-item/DeptItemCmp'
import {
    getFeeTypeOption,
    getInsideReceiverOption,
    getDeptStatusOption,
    getDeptTypeOption
} from '../../../utils/common'

export default {
    data: function () {
        return {
            remindedAccount: '',
            remindedName: '',
            debt: 0,
            mess: '',
            exchangeUserOption: [],
            exchangeUserValue: null,
            deptTypeOption: [],
            deptTypeValue: null,
            deptStatusOption: [],
            deptStatusValue: null,
            listDebt: [],
            index: 1,
            limit: 5,
            lastIndex: 0,
            standarAccount: {}
        };
    },
    methods: {
        onGetUserInfo: async function () {

            let payload = {
                q: {
                    account_number: this.remindedAccount,
                }
            }

            let respCustomerInfo = await this.$store.dispatch("userRole/getUserInfoByBankAccount", payload)
            if (respCustomerInfo && !respCustomerInfo.error) {
                alert("Lấy thông tin thành công")
                this.remindedName = respCustomerInfo.data.user[0].full_name
            } else {
                alert("Số tài khoản hoặc tên đăng nhập của bạn bị sai. Vui lòng nhập chính xác")
                this.remindedName = ''
            }
        },
        onSelectReceiver: function (obj) {
            let {
                id,
                text
            } = obj
            this.remindedAccount = id
            this.remindedName = text
        },
        onRemoveReceiver: function (obj) {
            this.remindedAccount = ''
            this.remindedName = ''
        },
        onCreateRemind: async function () {
            let payload = {

            }

            let body = {}
            body.remindedAccount = this.remindedAccount
            body.remindedName = this.remindedName
            body.mess = this.mess
            body.debt = this.debt

            payload.body = body

            let respCreateRemind = await this.$store.dispatch('debt/createDebt', payload)
            if (respCreateRemind && !respCreateRemind.error) {
                alert("Tạo nhắc nợ thành công")
                this.index = 1
                let payload = {
                    limit: this.limit,
                    offset: (this.index - 1) * this.limit,
                    q: {}
                }
                let respDebt = await this.$store.dispatch('debt/getDebt', payload)
                if (respDebt && !respDebt.error) {
                    this.listDebt = respDebt.data.data
                    if (respDebt.data.total % this.limit == 0) {
                        this.lastIndex = respDebt.data.total / this.limit;
                    } else {
                        this.lastIndex = parseInt(respDebt.data.total / this.limit) + 1;
                    }
                }
            } else {
                alert("Tạo nhắc nợ thất bại. Vui lòng thử lại sau")
            }
        },
        onFilterRemind: async function () {
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
                q: {}
            }
            if (this.deptStatusValue != null && this.deptStatusValue[0] != undefined) {
                payload.q.status = this.deptStatusValue[0].id
            }
            if (this.deptTypeValue != null && this.deptTypeValue[0] != undefined) {
                payload.q.type = this.deptTypeValue[0].id
            }

            let respDebt = await this.$store.dispatch('debt/getDebt', payload)
            if (respDebt && !respDebt.error) {
                console.log(respDebt)
                this.listDebt = respDebt.data.data
                if (respDebt.data.total % this.limit == 0) {
                    this.lastIndex = respDebt.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respDebt.data.total / this.limit) + 1;
                }
            }
        },
        onPaginationClick: async function (pageNumber) {
            this.index = pageNumber
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
                q: {}
            }

            if (this.deptStatusValue != null && this.deptStatusValue[0] != undefined) {
                payload.q.status = this.deptStatusValue[0].id
            }
            if (this.deptTypeValue != null && this.deptTypeValue[0] != undefined) {
                payload.q.type = this.deptTypeValue[0].id
            }

            let respDebt = await this.$store.dispatch('debt/getDebt', payload)
            if (respDebt && !respDebt.error) {
                this.listDebt = respDebt.data.data
                if (respDebt.data.total % this.limit == 0) {
                    this.lastIndex = respDebt.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respDebt.data.total / this.limit) + 1;
                }
            }
        },
    },
    components: {
        Multiselect,
        Paginate,
        AccountItemCmp,
        Datepicker,
        DeptItemCmp
    },
    mounted: async function () {
        this.exchangeUserOption = await getInsideReceiverOption()
        this.deptTypeOption = getDeptTypeOption()
        this.deptStatusOption = getDeptStatusOption()

        let payload = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
            q: {}
        }

        let respDebt = await this.$store.dispatch('debt/getDebt', payload)
        if (respDebt && !respDebt.error) {
            console.log(respDebt)
            this.listDebt = respDebt.data.data
            if (respDebt.data.total % this.limit == 0) {
                this.lastIndex = respDebt.data.total / this.limit;
            } else {
                this.lastIndex = parseInt(respDebt.data.total / this.limit) + 1;
            }
        }

        let respStandarAccount = await this.$store.dispatch('bankAccount/getStandarAccount', {})
        if (respStandarAccount && !respStandarAccount.error) {
            this.standarAccount = respStandarAccount.data.data
        }
    }
};
</script>

<style scoped>
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

.ipt-balance {
    display: block;
    border-radius: 5px;
    width: 100%;
    padding: 5px;
    border: 1px solid gray;
}
</style>
