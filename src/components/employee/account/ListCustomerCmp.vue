<template>
<div class="row" style="margin-right:5px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách tài khoản khách hàng</span>
                    <span class="sub-title">(Danh sách những tài khoản khách hàng đang sử dụng của 3TBank)</span>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-top:20px">
        <div class="row container-account" style="padding-top:20px">
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo trạng thái" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                        <multiselect v-model="sortValue" :options="sortOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                    </div>
                    <div class="col-lg-6 text-right">
                        <button class="btn btn-outline-info" data-toggle="modal" data-target="#addCustomerModal">
                            <i class="fas fa-plus-circle"></i>
                            Thêm tài khoản khách hàng
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 table-responsive-md">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">Họ tên</th>
                            <th scope="col" class="text-center">Email</th>
                            <th class="text-center" scope="col">Năm sinh</th>
                            <th class="text-center" scope="col">Số điện thoại</th>
                            <th class="text-center" scope="col">CMND</th>
                            <th class="text-center" scope="col">Ngày bắt đầu</th>
                            <th class="text-center" scope="col">Địa chỉ</th>
                            <th class="text-center" scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <EmployeeItemCmp v-on:onCompleteUpdate="onCompleteUpdateUser" v-for="customer in listCustomer" :key="customer.email" :employeeObj="customer" />
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
    <!-- Modal thêm nhân viên -->
    <div class="modal fade" id="addCustomerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM TÀI KHOẢN KHÁCH HÀNG</h5>
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
                                        Username
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="username" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Password
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="password" type="password" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Email
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="email" type="email" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số điện thoại
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="phone" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        CMND
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="identityNumber" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Họ và tên
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="fullName" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Ngày sinh
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker @selected="onGetDOB" v-model="dob" :language="vi" :bootstrap-styling="true">
                                    </datepicker>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Địa chỉ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="address" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onCreateCustomer">
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
import CustomerItemCmp from './list-item/CustomerItemCmp'
import EmployeeItemCmp from '../../admin/customer/list-item/EmployeeItemCmp'
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
            listCustomer: [],
            username: "",
            email: "",
            password: "",
            fullName: "",
            phone: "",
            identityNumber: "",
            address: "",
            dob: "",
            index: 1,
            limit: 5,
            lastIndex: 0,
            totalCustomer: 0
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
        onGetDOB: function (date) {
            this.dob = date;
        },
        onCreateCustomer: async function () {

            if (this.username == '') {
                alert("Bạn chưa điền thông tin username")
                return
            }
            if (this.password == '') {
                alert("Bạn chưa nhập password")
                return
            }
            if (this.email == '') {
                alert("Bạn chưa nhập email")
                return
            }
            if (this.fullName == '') {
                alert("Bạn chưa nhập đầy đủ họ và tên")
                return
            }
            if (this.phone == '') {
                alert("Bạn chưa nhập số điện thoại")
                return
            }
            if (this.identityNumber == '') {
                alert("Bạn chưa nhập chứng minh nhân dân")
                return
            }
            if (this.address == '') {
                alert("Bạn chưa nhập địa chỉ")
                return
            }

            if (this.dob == '') {
                alert("Bạn chưa nhập ngày tháng năm sinh")
                return
            }

            let body = {
                username: this.username,
                password: this.password,
                email: this.email,
                fullName: this.fullName,
                phone: this.phone,
                identityNumber: this.identityNumber,
                address: this.address,
                dob: this.dob,
                role_code: "CUSTOMER"
            }

            const resCreateUser = await this.$store.dispatch("userRole/createUserRole", body);

            if (resCreateUser && !resCreateUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Thêm khách hàng thành công")
                let modalAdd = document.getElementById("addCustomerModal")
                $(modalAdd).modal("hide")

                let payload = {
                    limit: this.limit,
                    offset: (this.index - 1) * this.limit,
                }
                let q = {}
                q.roleCode = "CUSTOMER"
                payload.q = q

                const res = await this.$store.dispatch("userRole/getUserRole", payload);

                if (res && !res.error) {

                    this.listCustomer = res.data.users;
                    this.totalCustomer = res.data.total;

                    if (res.data.total % this.limit == 0) {
                        this.lastIndex = res.data.total / this.limit;
                    } else {
                        this.lastIndex = parseInt(res.data.total / this.limit) + 1;
                    }
                }
            } else {
                alert("Có lỗi xảy ra.Vui lòng thử lại sau")
            }
        },
        onPaginationClick: async function (pageNumber) {
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }
            let q = {}
            q.roleCode = "CUSTOMER"
            payload.q = q

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {

                this.listCustomer = res.data.users;
                this.totalCustomer = res.data.total;

                if (res.data.total % this.limit == 0) {
                    this.lastIndex = res.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(res.data.total / this.limit) + 1;
                }
            }
        },
        onCompleteUpdateUser: async function () {
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }
            let q = {}
            q.roleCode = "CUSTOMER"
            payload.q = q

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {

                this.listCustomer = res.data.users;
                this.totalCustomer = res.data.total;

                if (res.data.total % this.limit == 0) {
                    this.lastIndex = res.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(res.data.total / this.limit) + 1;
                }
            }
        }
    },
    mounted: async function () {
        let payload = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
        }
        let q = {}
        q.roleCode = "CUSTOMER"
        payload.q = q

        const res = await this.$store.dispatch("userRole/getUserRole", payload);

        if (res && !res.error) {

            this.listCustomer = res.data.users;
            this.totalCustomer = res.data.total;

            if (res.data.total % this.limit == 0) {
                this.lastIndex = res.data.total / this.limit;
            } else {
                this.lastIndex = parseInt(res.data.total / this.limit) + 1;
            }
        }
    },
    components: {
        Multiselect,
        Paginate,
        CustomerItemCmp,
        EmployeeItemCmp,
        Datepicker
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
