<template>
<div class="row">
    <div class="col-lg-12">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-1" style="padding-right:0px">
                    <i class="fas fa-handshake icon-title"></i>
                </div>
                <div class="col-lg-11" style="padding-left:0px">
                    <div class="header-title">
                        <span class="main-title">Danh sách người nhận</span>
                        <span class="sub-title">(Danh sách những người nhận mà bạn đã lưu để chuyển khoảng)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account" style="padding-top:10px">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN NGƯỜI NHẬN</h5>
                </div>
                <div class="col-lg-12" style="margin-top: 20px">
                    <div class="row">

                        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <label for="">Loại giao dịch</label>
                            <multiselect v-model="transactionValue" :options="transationOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Chọn loại tài khoản" label="text" track-by="id" :preselect-first="false" @select="onSelectTransactionType($event)" @remove="onRemoveTransationType($event)" />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-12" id="selectPartner" style="margin-bottom: 20px">
                            <label for="">Tên ngân hàng</label>
                            <multiselect v-model="partnerValue" :options="partnerOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo ngân hàng" label="text" track-by="id" :preselect-first="false" />
                        </div>

                        <div class="col-lg-1" style="margin-top:33px">
                            <button class="btn btn-outline-success" @click="onFilterHistory">LỌC</button>
                        </div>
                        <div class="col-lg-3 text-right" style="margin-top:33px">
                            <button class="btn btn-outline-info" data-toggle="modal" data-target="#addEmployeeModal">
                                <i class="fas fa-plus-circle"></i>
                                Thêm người nhận
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 table-responsive-md">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col" class="text-center">Số tài khoản</th>
                                <th scope="col" class="text-center">Tên người nhận</th>
                                <th class="text-center" scope="col">Tên ngân hàng</th>
                                <th class="text-center" scope="col">Loại</th>
                                <th class="text-center" scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ReceiverItemCmp />
                        </tbody>
                    </table>
                </div>
                <div class="col-12 text-center" style="margin-top:20px">
                    <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index">
                </paginate>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm người nhận -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM TÀI KHOẢN NGƯỜI NHẬN</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập số tài khoản
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập tên gợi nhớ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Loại tài khoản
                                        <span style="color:red">(*)</span>
                                    </label>

                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="insideCheck" @input="onCheckType" value="IS_INSIDE" />
                                    <label class="form-check-label" for="inlineRadio1">Nội bộ</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="outsideCheck" @input="onCheckType" value="IS_OUTSIDE" />
                                    <label class="form-check-label" for="inlineRadio2">Liên ngân hàng</label>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Tên ngân hàng
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <multiselect v-model="partnerValue" :options="partnerOption" :disabled="this.isDisabledOutsideCheck" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success">
                                    <i class="far fa-save"></i>
                                    Lưu
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
import ReceiverItemCmp from "./list-item/ReceiverItemCmp";
import {
    getPartner,
    getTransationOption
} from '../../../utils/common'
export default {
    data: function () {
        return {
            transactionValue: null,
            transationOption: [],
            partnerOption: [],
            partnerValue: null,
            index: 1,
            limit: 5,
            lastIndex: 0,
            isDisabledOutsideCheck: true
        };
    },
    methods: {
        onCheckType: function (e) {
            if (e.target.value == "IS_OUTSIDE") {
                this.isDisabledOutsideCheck = false
            } else {
                this.isDisabledOutsideCheck = true
            }
        },
        onSelectTransactionType: function (obj) {
            let {
                id,
                text
            } = obj;

            if (id != 'INSIDE') {
                document.getElementById("selectPartner").style.display = 'block'
            } else {
                document.getElementById("selectPartner").style.display = 'none'
                this.partnerValue != null
            }
        },
        onRemoveTransationType: function (obj) {
            document.getElementById("selectPartner").style.display = 'none'
            this.partnerValue != null
        },
        onFilterHistory: async function () {

            let q = {}
            let payloadHistory = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }

            if (this.transactionValue != null && this.transactionValue[0] != undefined) {
                q.isInside = this.transactionValue[0].id == 'INSIDE' ? true : false

                if (q.isInside == false) {
                    if (this.partnerValue != null && this.partnerValue[0] != undefined) {
                        q.partnerCode = this.partnerValue[0].id
                    }
                }
            }

            payloadHistory.q = q

            let respReceiveHistory = await this.$store.dispatch("exchangeMoney/getAllReceiver", payloadHistory)

            if (respReceiveHistory && !respReceiveHistory.error) {
                this.listReceive = respReceiveHistory.data.data

                this.totalReceive = respReceiveHistory.data.total;
                this.totalTransaction = respReceiveHistory.data.sum

                if (respReceiveHistory.data.total % this.limit == 0) {
                    this.lastIndex = respReceiveHistory.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respReceiveHistory.data.total / this.limit) + 1;
                }
                this.isShown = true
            } else {
                this.isShown = false
            }
        }
    },
    components: {
        Multiselect,
        Paginate,
        AccountItemCmp,
        ReceiverItemCmp,
        Datepicker
    },
    mounted: async function () {
        this.partnerOption = await getPartner()
        this.transationOption = getTransationOption()
    }
};
</script>

<style scoped>
.container-account {
    box-shadow: 1px 0px 10px 1px #ebebeb;
    padding-top: 10px;
    border-radius: 5px;
    padding-bottom: 0px;
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
