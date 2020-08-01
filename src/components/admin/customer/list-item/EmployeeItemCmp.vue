<template>
<tr>
    <td style="vertical-align: middle" class="text-center">{{employeeObj.full_name}}</td>
    <td style="vertical-align: middle" :title="employeeObj.email" class="text-center">
        <p>{{employeeObj.email}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">{{employeeObj.dob | moment("DD/MM/YYYY")}}</td>
    <td class="text-center text-wrap" :title="employeeObj.address" style="vertical-align: middle">
        <p>{{employeeObj.phone}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{employeeObj.identity_number}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <span>{{employeeObj.created_date | moment("DD/MM/YYYY")}}</span>
    </td>
    <td class="text-center text-wrap" :title="employeeObj.address" style="vertical-align: middle">
        <p>{{employeeObj.address}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" data-toggle="modal" :data-target="'#updateEmployeeModal'+employeeObj.user_id">Cập nhật</button>
                <button class="dropdown-item" data-toggle="modal" :data-target="'#deleteEmployeeModal'+employeeObj.user_id">Xóa</button>
            </div>
        </div>
    </td>

    <div class="modal fade" :id="'updateEmployeeModal'+employeeObj.user_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CẬP NHẬT THÔNG TIN CÁ NHÂN</h5>
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
                                        Email
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="employeeObj.email" disabled type="email" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số điện thoại
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="employeeObj.phone" disabled type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        CMND
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="employeeObj.identity_number" disabled type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Họ và tên
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="employeeObj.full_name" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Ngày sinh
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <datepicker v-model="employeeObj.dob" :bootstrap-styling="true"></datepicker>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Giới tính
                                    </label>
                                    <multiselect v-model="genderValue" :options="genderOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" placeholder="Chọn giới tính" label="text" track-by="id" :preselect-first="false" />
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Địa chỉ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input v-model="employeeObj.address" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onUpdateEmployee">
                                    <i class="far fa-save"></i>
                                    Cập nhật
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

    <div class="modal fade" :id="'deleteEmployeeModal'+employeeObj.user_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <h6>Bạn có chắc chắn muốn xóa tài khoản này ?</h6>
                            </div>

                            <div class="col-lg-12 text-center">
                                <button class="btn btn-outline-danger" @click="onDeleteEmployee">
                                    <i class="far fa-save"></i>
                                    Xóa
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
</tr>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import Multiselect from "vue-multiselect";
export default {
    props: {
        employeeObj: Object,
    },
    mounted: function () {
        console.log(this.employeeObj);
    },
    data() {
        return {
            genderValue: null,
            genderOptions: [],
        }
    },
    methods: {
        onUpdateEmployee: async function () {
            let payloadUpdate = {
                userId: this.employeeObj.user_id
            }

            if (this.genderValue != null && this.genderValue[0] != undefined) {
                this.employeeObj.gender = this.genderValue[0].id;
            }

            let body = {
                fullName: this.employeeObj.full_name,
                phone: this.employeeObj.phone,
                address: this.employeeObj.address,
                dob: this.employeeObj.dob,
                gender: this.employeeObj.gender
            };

            payloadUpdate.body = body

            const resUpdateUser = await this.$store.dispatch(
                "userRole/updateUserRole",
                payloadUpdate
            );
            let modalUpdate = document.getElementById("updateEmployeeModal" + this.employeeObj.user_id);
            if (resUpdateUser && !resUpdateUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Cập nhật thông tin cá nhân thành công");

                this.$emit("onCompleteUpdate")
            } else {
                alert("Có lỗi xảy ra.Vui lòng thử lại sau");
            }
            $(modalUpdate).modal("hide");

        },
        onDeleteEmployee: async function () {
            let payloadDelete = {
                userId: this.employeeObj.user_id
            }

            const resDeleteUser = await this.$store.dispatch(
                "userRole/deleteUserRole",
                payloadDelete
            );

            if (resDeleteUser && !resDeleteUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Xóa nhân viên thành công");
                let modalDelete = document.getElementById("deleteEmployeeModal" + this.employeeObj.user_id);
                $(modalDelete).modal("hide");

                this.$emit("onCompleteUpdate")
            } else {
                alert("Có lỗi xảy ra.Vui lòng thử lại sau");
            }
        },
        getGender: function () {
            let genderOpts = [{
                    id: 'MALE',
                    text: "Nam"
                },
                {
                    id: 'FEMALE',
                    text: "Nữ"
                }
            ]
            return genderOpts
        },
    },
    mounted() {
        this.genderOptions = this.getGender()

        let genderInfo = this.genderOptions.find(gender => {
            return gender.id == this.employeeObj.gender
        })
        this.genderValue = {
            id: this.employeeObj.gender,
            text: genderInfo.text
        }
    },
    components: {
        Datepicker,
        Multiselect
    },
};
</script>

<style scoped>
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    margin-bottom: 0px;
}

.btn-outline-success {
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
</style>
