<template>
<div class="row" style="margin-right:5px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách giao nhận tiền</span>
                    <span class="sub-title">(Danh sách giao dịch nhận tiền của khách hàng của 3TBank)</span>
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
    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account" style="padding-top:20px">
            <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                <h5>THÔNG TIN GIAO DỊCH NHẬN TIỀN</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo trạng thái" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <multiselect v-model="sortValue" :options="sortOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                    </div>
                </div>
            </div>
            <div class="col-lg-12 table-responsive-md">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">STT</th>
                            <th scope="col" class="text-center">Số TK</th>
                            <th scope="col" class="text-center">Họ tên</th>
                            <th scope="col" class="text-center">Ngân hàng</th>
                            <th class="text-center" scope="col">Số tiền</th>
                            <th class="text-center" scope="col">Ngày nhận</th>
                            <th class="text-center" scope="col">Nội dung</th>
                            <th class="text-center" scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <HistoryReceiveItemCmp />
                    </tbody>
                </table>
            </div>
            <div class="col-12 text-center" style="margin-top:20px">
                <paginate :page-count="5" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
import HistoryReceiveItemCmp from '../../customer/account/list-item/HistoryReceiveItemCmp'
export default {
    data: function () {
        return {
            bankAccount: '',
            username: '',
            isShown: false,
        };
    },
    methods: {
        onGetCustomerInfo: async function () {
            if (this.bankAccount == '') {
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
                this.customerInfo = respCustomerInfo.data.user[0]
                this.isShown = true
            } else {
                alert("Số tài khoản hoặc tên đăng nhập của bạn bị sai. Vui lòng nhập chính xác")
                this.isShown = false
            }
        },
    },
    components: {
        Multiselect,
        Paginate,
        Datepicker,
        HistoryReceiveItemCmp
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
