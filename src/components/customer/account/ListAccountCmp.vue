<template>
<div class="row" style="margin-right:3px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách tài khoản</span>
                    <span class="sub-title">(Danh sách những tài khoản khách hàng đang sử dụng của 3TBank)</span>
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
        <div class="row container-account" style="padding-top:20px">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN TÀI KHOẢN TIẾT KIỆM</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-6" style="margin-bottom: 20px">
                        <input type="number" class="form-control" id="txt-search" aria-describedby="Search" v-model="accountNumber" />

                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-6" style="margin-bottom: 20px">
                        <button class="btn btn-outline-warning" @click="onSearch">Tìm kiếm</button>
                    </div>
                    <div class="col-lg-6 text-right">
                        <button class="btn btn-outline-info" data-toggle="modal" data-target="#createDepositAccount">
                            <i class="fas fa-plus-circle"></i>
                            Thêm tài khoản tiết kiệm
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 table-responsive-md">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col" class="text-center">Mã TK</th>
                            <th scope="col" class="text-center">Số tiền gửi</th>
                            <th scope="col" class="text-center">Ngày gửi</th>
                            <th class="text-center" scope="col">Ngày nhận</th>
                            <th class="text-center" scope="col">Mức lãi suất</th>
                            <th class="text-center" scope="col">Số tiền lãi</th>
                            <th class="text-center" scope="col">Tiền lãi cuối kỳ</th>
                            <th class="text-center" scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AccountItemCmp v-on:onCompleteUpdate="onCompleteRedeem" v-for="depositAcc in arrDepositAccount" :key="depositAcc.email" :depositAcc="depositAcc" :ratioData="ratioData" />
                    </tbody>
                </table>
            </div>
            <div class="col-12 text-center" style="margin-top:20px">
                <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="createDepositAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM TÀI KHOẢN TIẾT KIỆM</h5>
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
                                        Nhập số tiền muốn gửi
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" v-model="depositAccount.deposit" @change="onDepositChange($event)" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Loại tiết kiệm
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <multiselect v-model="ratioValue" :options="ratioOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Loại tiết kiệm" label="text" track-by="id" :preselect-first="false" @select="onSelectRatio($event)" @remove="onRemoveRatio($event)" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Mức lãi suất (%)
                                    </label>
                                    <input type="number" disabled class="form-control" id="txt-ratio" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Lãi cuối kỳ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" disabled class="form-control" id="txt-redeem" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onCreateDepositBank">
                                    <i class="far fa-save"></i>
                                    Gửi
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
export default {
    data: function () {
        return {
            statusValue: [],
            statusOptions: [{
                    id: "ACTIVE",
                    text: "Đang tuyển"
                },
                {
                    id: "EXPIRED",
                    text: "Đã hết hạn"
                }
            ],
            sortValue: [],
            sortOptions: [{
                    id: "ASC",
                    text: "Cũ nhất"
                },
                {
                    id: "DESC",
                    text: "Mới nhất"
                }
            ],
            ratioValue: [],
            ratioOptions: [],
            index: 1,
            lastIndex: 0,
            limit: 10,
            standarAccount: {},
            depositAccount: {
                deposit: 0,
                ratioMonth: 0,
                type: "DEPOSIT",
            },
            arrDepositAccount: [],
            ratioData: [],
            accountNumber: ""
        };
    },
    methods: {
        onSelectCategoryJob: function (obj) {
            let {
                id,
                text
            } = obj;
            console.log(text);
        },
        onRemoveGender: function (obj) {
            let {
                id,
                text
            } = obj;
        },
        onSelectRatio: function (obj) {
            let {
                id,
                text
            } = obj;
            this.depositAccount.ratioMonth = id;
            $('#txt-ratio').val(this.ratioData[id - 1].toString());
            let redeem = parseInt(this.depositAccount.deposit) + parseInt(this.depositAccount.deposit * this.ratioData[id - 1] / 100);
            $('#txt-redeem').val(redeem.toString())

        },
        onRemoveRatio: function (obj) {
            $('#txt-redeem').val("")
        },
        onDepositChange: function (obj) {
            if (this.depositAccount.ratioMonth != 0) {
                let redeem = parseInt(this.depositAccount.deposit) + parseInt(this.depositAccount.deposit * this.ratioData[this.depositAccount.ratioMonth - 1] / 100);
                $('#txt-redeem').val(redeem.toString())
            }

        },
        onCreateDepositBank: async function (obj) {
            let depositResp = await this.$store.dispatch('bankAccount/createbankAccount', this.depositAccount);
            if (depositResp && !depositResp.error) {
                alert('Tạo tài khoản tiết kiệm thành công.');
                $('#createDepositAccount').modal('hide');
                let respDepositAccount = await this.$store.dispatch('bankAccount/getDepositAccount', {
                    offset: 0,
                    limit: 10
                })
                if (respDepositAccount && !respDepositAccount.error) {
                    this.arrDepositAccount = respDepositAccount.data.data;
                    if (respDepositAccount.data.total % 10 == 0) {
                        this.lastIndex = respDepositAccount.data.total / 10;
                    } else {
                        this.lastIndex = parseInt(respDepositAccount.data.total / 10) + 1;
                    }
                }
            }
        },
        onPaginationClick: async function (obj) {
            let payload = {
                limit: 10,
                offset: (this.index - 1) * 10,
            }

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {

                this.arrDepositAccount = res.data.data;
            }
        },
        onSearch: async function (obj) {
            let respDepositAccount = await this.$store.dispatch('bankAccount/getDepositAccount', {
                offset: 0,
                limit: 10,
                accountNumber: this.accountNumber
            })
            if (respDepositAccount && !respDepositAccount.error) {
                this.arrDepositAccount = respDepositAccount.data.data;
                if (respDepositAccount.data.total % 10 == 0) {
                    this.lastIndex = respDepositAccount.data.total / 10;
                } else {
                    this.lastIndex = parseInt(respDepositAccount.data.total / 10) + 1;
                }
            }
        },
        onCompleteRedeem: async function (obj) {
            let payload = {
                limit: 10,
                offset: 0,
            }

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {
                this.arrDepositAccount = res.data.data;
            }
        },
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

        let respRatio = await this.$store.dispatch('ratio/getRatio', {})
        if (respRatio && !respRatio.error) {
            //this.standarAccount = respStandarAccount.data.data
            let ratioData = respRatio.data.data;
            ratioData.forEach(element => {
                this.ratioOptions.push({
                    id: element.month,
                    text: element.month.toString() + " tháng"
                });
                this.ratioData.push(element.ratio);
            });
        }

        let respDepositAccount = await this.$store.dispatch('bankAccount/getDepositAccount', {
            offset: (this.index - 1) * this.limit,
            limit: this.limit
        })

        if (respDepositAccount && !respDepositAccount.error) {
            this.arrDepositAccount = respDepositAccount.data.data;
            if (respDepositAccount.data.total) {
                if (respDepositAccount.data.total % 10 == 0) {
                    this.lastIndex = respDepositAccount.data.total / 10;
                } else {
                    this.lastIndex = parseInt(respDepositAccount.data.total / 10) + 1;
                }
            }
        }

        console.log(this.lastIndex)
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
