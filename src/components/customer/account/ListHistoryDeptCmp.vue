<template>
<div class="row" style="margin-right:3px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">LỊCH SỬ THANH TOÁN NỢ</span>
                    <span class="sub-title">(Quản lý danh sách lịch sử nợ của bạn đã được thanh toán)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account" style="padding-top:10px;padding-bottom:0px">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>DANH SÁCH LỊCH SỬ</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row" style="margin-bottom:20px">
                  
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
                            <th class="text-center">Ngày thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <HistoryDeptItemCmp v-on:onCompleteUpdateDebt='onCompleteUpdateDebt' v-for="debt in listDebt" :key='debt._id' :debtObj='debt'/>
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
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
import HistoryReceiveItemCmp from './list-item/HistoryReceiveItemCmp'
import HistoryDeptItemCmp from './list-item/HistoryDeptItemCmp'

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
        };
    },
    methods: {
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
        onCompleteUpdateDebt: async function () {
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
        }
    },
    components: {
        Multiselect,
        Paginate,
        Datepicker,
        HistoryReceiveItemCmp,
        HistoryDeptItemCmp,
        DeptItemCmp
    },
    mounted: async function () {

        let payload = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
            q: {
                status: "DONE",
                type:"REMINDED"
            }
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
</style>
