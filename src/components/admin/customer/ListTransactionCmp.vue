<template>
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fab fa-bitcoin icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách giao dịch</span>
                    <span class="sub-title">(Danh sách giao dịch giữa ngân hàng 3TBank với ngân hàng liên kết)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12" id="selectPartner" style="margin-bottom: 20px">
                <label for="">Tên ngân hàng</label>
                <multiselect v-model="partnerValue" :options="partnerOption" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo ngân hàng" label="text" track-by="id" :preselect-first="false" />
            </div>
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
            <div class="col-lg-12" style="margin-bottom: 20px">
                <button class="btn btn-outline-success" @click="onFilterTransaction">LỌC</button>
            </div>
            <div class="col-12" style="margin-bottom: 20px">
                        <label for="">Tổng giao dịch: </label>
                        <currency-input class="ipt-balance" :value="sumTotal" disabled v-currency="{
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
                        <label for="">Tổng giao dịch trong tháng: </label>
                        <currency-input class="ipt-balance" :value="sumMonth" disabled v-currency="{
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
                    <th scope="col" class="text-center">Mã đối tác</th>
                    <th scope="col" class="text-center">Tên đối tác</th>
                    <th scope="col" class="text-center">Số TK người gửi</th>
                    <th scope="col" class="text-center">Số TK người nhận</th>
                    <th scope="col" class="text-center">Tên người gửi</th>
                    <th scope="col" class="text-center">Tên người nhận</th>
                    <th scope="col" class="text-center">Số tiền</th>
                    <th scope="col" class="text-center">Ngày GD</th>
                </tr>
            </thead>
            <tbody>
                <TransactionItemCmp v-for="transaction in listTransaction" :key="transaction.exchange_money_id" :historyObj="transaction"/>
            </tbody>
        </table>
    </div>

    <div class="col-12 text-center" style="margin-top:20px">
        <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
    </div>

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from 'vuejs-datepicker';
import {
    getPartner
} from '../../../utils/common'
import TransactionItemCmp from './list-item/TransactionItemCmp'
export default {
    data: function () {
        return {
            listTransaction: [],
            index: 1,
            limit: 5,
            lastIndex: 0,
            totalTransaction: 0,
            fromDate: '',
            toDate: '',
            partnerOption: [],
            partnerValue: null,
            sumTotal: 0,
            sumMonth: 0,
        };
    },
    methods: {
        onPaginationClick: async function (pageNumber) {
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }
            let q = {}
            payload.q = q

            const res = await this.$store.dispatch("exchangeMoney/getAllHistoryAdmin", payload);

            if (res && !res.error) {

                this.listTransaction = res.data.data;
                this.total = res.data.resCount;

                if (respTransaction.data.total % this.limit == 0) {
                    this.lastIndex = respTransaction.data.resCount / this.limit;
                } else {
                    this.lastIndex = parseInt(respTransaction.data.resCount / this.limit) + 1;
                }
            }
        },
        onFilterTransaction: async function () {

            let q = {}
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }

            if (this.fromDate != '') {
                q.start = this.fromDate
            }
            if (this.toDate != '') {
                q.end = this.toDate
            }

            if (this.partnerValue != null && this.partnerValue[0] != undefined) {
                q.partnerCode = this.partnerValue[0].id
            }

            payload.q = q

            let respTransaction = await this.$store.dispatch("exchangeMoney/getAllHistoryAdmin", payload)

            if (respTransaction && !respTransaction.error) {
                this.listTransaction = respTransaction.data.data
                this.total = respTransaction.data.total;
                this.sumMonth = respTransaction.data.sumMonth;
                this.sumTotal = respTransaction.data.sumTotal;

                if (respTransaction.data.total % this.limit == 0) {
                    this.lastIndex = respTransaction.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(respTransaction.data.total / this.limit) + 1;
                }
            }
        }
    },
    components: {
        Multiselect,
        Paginate,
        TransactionItemCmp,
        Datepicker
    },
    mounted: async function () {
        this.partnerOption = await getPartner()

        let payload = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
        }
        let q = {}
        if (this.fromDate != '') {
            q.start = this.fromDate
        }
        if (this.toDate != '') {
            q.end = this.toDate
        }

        

        payload.q = q

        const res = await this.$store.dispatch("exchangeMoney/getAllHistoryAdmin", payload);

        if (res && !res.error) {
            this.listTransaction = res.data.data;
            this.total = res.data.total;
            this.sumTotal = res.data.sumTotal;
            this.sumMonth = res.data.sumMonth;

            if (res.data.total % this.limit == 0) {
                this.lastIndex = res.data.total / this.limit;
            } else {
                this.lastIndex = parseInt(res.data.total / this.limit) + 1;
            }
        }
    },
};
</script>

<style scoped>
.header-title {
    display: inline-flex;
    flex-direction: column;
}

.icon-title {
    font-size: 48px;
}

.main-title {
    font-size: 20px;
}

.sub-title {
    font-size: 15px;
}
</style>
