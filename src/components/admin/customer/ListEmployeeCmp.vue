<template>
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-users icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách nhân viên</span>
                    <span class="sub-title">(Danh sách những nhân viên làm việc cho hệ thống ngân hàng 3TBank)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="row" style="margin-bottom:20px">
            <div class="col-lg-12 text-right">
                <button class="btn btn-outline-info" data-toggle="modal" data-target="#addEmployeeModal">
                    <i class="fas fa-plus-circle"></i>
                    Thêm nhân viên
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
                <EmployeeItemCmp v-on:onCompleteUpdate="onCompleteUpdateUser" v-for="employee in listEmployee" :key="employee.email" :employeeObj="employee" />
            </tbody>
        </table>
    </div>

    <div class="col-12 text-center" style="margin-top:20px">
        <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index">
        </paginate>
    </div>

    <!-- Modal thêm nhân viên -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM NHÂN VIÊN</h5>
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
                            <div class="col-lg-6">
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
                                <button class="btn btn-outline-success" @click="onCreateEmployee">
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
import Datepicker from 'vuejs-datepicker';
import EmployeeItemCmp from "./list-item/EmployeeItemCmp";
import store from "../../../store/modules/user_role"
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
            listEmployee: [],
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
            totalEmployee: 0
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
        onCreateEmployee: async function () {

            let body = {
                username: this.username,
                password: this.password,
                email: this.email,
                fullName: this.fullName,
                phone: this.phone,
                identityNumber: this.identityNumber,
                address: this.address,
                dob: this.dob,
                role_code: "EMPLOYEE"
            }

            const resCreateUser = await this.$store.dispatch("userRole/createUserRole", body);

            if (resCreateUser && !resCreateUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Thêm nhân viên thành công")
                let modalAdd = document.getElementById("addEmployeeModal")
                $(modalAdd).modal("hide")

                let payload = {
                    limit: this.limit,
                    offset: (this.index - 1) * this.limit,
                }
                let q = {}
                q.roleCode = "EMPLOYEE"
                payload.q = q

                const res = await this.$store.dispatch("userRole/getUserRole", payload);

                if (res && !res.error) {

                    this.listEmployee = res.data.users;
                    this.totalEmployee = res.data.total;

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
            q.roleCode = "EMPLOYEE"
            payload.q = q

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {

                this.listEmployee = res.data.users;
                this.totalEmployee = res.data.total;

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
            q.roleCode = "EMPLOYEE"
            payload.q = q

            const res = await this.$store.dispatch("userRole/getUserRole", payload);

            if (res && !res.error) {

                this.listEmployee = res.data.users;
                this.totalEmployee = res.data.total;

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
        q.roleCode = "EMPLOYEE"
        payload.q = q

        const res = await this.$store.dispatch("userRole/getUserRole", payload);

        if (res && !res.error) {

            this.listEmployee = res.data.users;
            this.totalEmployee = res.data.total;

            if (res.data.total % this.limit == 0) {
                this.lastIndex = res.data.total / this.limit;
            } else {
                this.lastIndex = parseInt(res.data.total / this.limit) + 1;
            }
        }
        console.log(this.lastIndex)
    },
    components: {
        Multiselect,
        Paginate,
        EmployeeItemCmp,
        Datepicker
    }
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
