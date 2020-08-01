<template>
<div class="row" style="margin-right:4px">
    <div class="col-lg-12">
        
            <div class="row container-account">
                <div class="col-lg-1" style="padding-right:0px">
                    <i class="fas fa-paper-plane icon-title"></i>
                </div>
                <div class="col-lg-11" style="padding-left:0px">
                    <div class="header-title">
                        <span class="main-title">Lịch sử chuyển tiền</span>
                        <span class="sub-title">(Quản lý danh sách chuyển tiền cho người khác)</span>
                    </div>
                </div>
            </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
            <div class="row container-account" style="padding-top:10px;padding-bottom:0px">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN CHUYỂN TIỀN</h5>
                </div>
                <div class="col-lg-12" style="margin-top: 20px">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <label for="">Từ ngày</label>
                            <datepicker v-model="fromDate" :bootstrap-styling="true">
                            </datepicker>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <label for="">Đến ngày</label>
                            <datepicker v-model="toDate" :bootstrap-styling="true">
                            </datepicker>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <label for="">Loại giao dịch</label>
                            <multiselect v-model="transactionValue" :options="transationOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo ngân hàng" label="text" track-by="id" :preselect-first="false" @select="onSelectTransactionType($event)" @remove="onRemoveTransationType($event)" />
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12" id="selectPartner" style="margin-bottom: 20px">
                            <label for="">Tên ngân hàng</label>
                            <multiselect v-model="partnerValue" :options="partnerOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo ngân hàng" label="text" track-by="id" :preselect-first="false" />
                        </div>
                        <div class="col-lg-12" style="margin-bottom: 20px">
                            <button class="btn btn-outline-success" @click="onFilterHistory">LỌC</button>
                        </div>
                        <div class="col-12" style="margin-bottom: 20px">
                            <label for="">Tổng giao dịch: </label>
                            <currency-input class="ipt-balance" :value="totalSumTransaction" disabled v-currency="{
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
                        <div class="col-12" style="margin-bottom: 20px">
                            <label for="">Tổng giao dịch trong <b>tháng {{currentMonth}}</b> : </label>
                            <currency-input class="ipt-balance" :value="totalMonthTransaction" disabled v-currency="{
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
                </div>
                <div class="col-lg-12 table-responsive-md">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">Số TK</th>
                                <th scope="col" class="text-center">Họ tên</th>
                                <th scope="col" class="text-center">Ngân hàng</th>
                                <th class="text-center" scope="col">Số tiền</th>
                                <th class="text-center" scope="col">Ngày gửi</th>
                                <th class="text-center" scope="col">Nội dung</th>

                            </tr>
                        </thead>
                        <tbody>
                            <HistorySendItemCmp v-for="send in listSend" :key="send.exchange_money_id" :historyObj="send" />
                            <tr>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <currency-input class="ipt-balance" :value="totalTransaction" disabled v-currency="{
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
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 text-center" style="margin-top:0px">
                    <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index">
                    </paginate>
                </div>
            </div>
    </div>

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
import HistorySendItemCmp from '../../customer/account/list-item/HistorySendItemCmp'
import {
    getTransationOption,
    getPartner
} from '../../../utils/common'
export default {
    data: function () {
        return {
            listSend: [],
            index: 1,
            limit: 5,
            lastIndex: 0,
            totalSend: 0,
            fromDate: '',
            toDate: '',
            transactionValue: null,
            transationOption: [],
            totalTransaction: 0,
            partnerOption: [],
            partnerValue: null,
            isSelectedInside: true,
            currentMonth: 0,
            totalSumTransaction: 0,
            totalMonthTransaction: 0
        };
    },
    methods: {
        onPaginationClick: async function (pageNumber) {
            let q = {}
            let payloadHistory = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }

            if (this.fromDate != '') {
                q.start = this.fromDate
            }
            if (this.toDate != '') {
                q.end = this.toDate
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
            let respSendHistory = await this.$store.dispatch("exchangeMoney/getAllSender", payloadHistory)

            if (respSendHistory && !respSendHistory.error) {
                this.listSend = respSendHistory.data.data

                this.totalReceive = respSendHistory.data.total;
                this.totalTransaction = respSendHistory.data.sum
                this.totalSumTransaction = respSendHistory.data.sumTotal
                this.totalMonthTransaction = respSendHistory.data.sumMonth

                if (respSendHistory.data.total % this.limit == 0) {
                    this.lastIndex = respSendHistory.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respSendHistory.data.total / this.limit) + 1;
                }
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

            if (this.fromDate != '') {
                q.start = this.fromDate
            }
            if (this.toDate != '') {
                q.end = this.toDate
            }

            let toDate = new Date(this.toDate).getTime()
            let fromDate = new Date(this.fromDate).getTime()
            if (toDate < fromDate) {
                alert("Ngày kết thúc phải lớn hơn ngày bắt đầu")
                return
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

            let respSendHistory = await this.$store.dispatch("exchangeMoney/getAllSender", payloadHistory)

            if (respSendHistory && !respSendHistory.error) {
                this.listSend = respSendHistory.data.data

                this.totalReceive = respSendHistory.data.total;
                this.totalTransaction = respSendHistory.data.sum
                this.totalSumTransaction = respSendHistory.data.sumTotal
                this.totalMonthTransaction = respSendHistory.data.sumMonth

                if (respSendHistory.data.total % this.limit == 0) {
                    this.lastIndex = respSendHistory.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respSendHistory.data.total / this.limit) + 1;
                }
            }
        }
    },
    components: {
        Multiselect,
        Paginate,
        Datepicker,
        HistorySendItemCmp
    },
    mounted: async function () {
        this.transationOption = getTransationOption()
        this.partnerOption = await getPartner()

        let payloadHistory = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
            q: {}
        }
        let respSendHistory = await this.$store.dispatch("exchangeMoney/getAllSender", payloadHistory)

        if (respSendHistory && !respSendHistory.error) {
            this.listSend = respSendHistory.data.data

            this.totalReceive = respSendHistory.data.total;
            this.totalTransaction = respSendHistory.data.sum
            this.totalSumTransaction = respSendHistory.data.sumTotal
            this.totalMonthTransaction = respSendHistory.data.sumMonth

            if (respSendHistory.data.total % this.limit == 0) {
                this.lastIndex = respSendHistory.data.total / this.limit;
            } else {
                this.lastIndex = parseInt(respSendHistory.data.total / this.limit) + 1;
            }
        }

        let currentDate = new Date()
        this.currentMonth = currentDate.getMonth() + 1
    }
};
</script>

<style scoped>
#selectPartner {
    display: none;
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

.ipt-balance {
    background: transparent;
    border: none;
    border-bottom: 1px solid gray;
    text-align: right;
}
</style>
