<template>
<tr>
    <td style="vertical-align: middle" class="text-center">{{employeeObj.full_name}}</td>
    <td style="vertical-align: middle" :title="employeeObj.email" class="text-center">
        <p>{{employeeObj.email}}</p>
    </td>
    <td style="vertical-align: middle" class="text-center">{{employeeObj.dob | moment("DD/MM/YYYY")}}</td>
    <td class="text-center text-wrap" :title="employeeObj.address" style="vertical-align: middle">
        <p>{{employeeObj.address}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <p>{{employeeObj.phone}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <span>{{employeeObj.created_date | moment("DD/MM/YYYY")}}</span>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" data-toggle="modal" :data-target="'#updateEmployeeModal'+employeeObj.user_id">Cập nhật</button>
                <button class="dropdown-item"  data-toggle="modal" :data-target="'#deleteEmployeeModal'+employeeObj.user_id">Xóa</button>
            </div>
        </div>
    </td>

    <div class="modal fade" :id="'updateEmployeeModal'+employeeObj.user_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CẬP NHẬT NHÂN VIÊN</h5>
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
                                    <input v-model="employeeObj.phone" type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
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
export default {
    props: {
        employeeObj: Object,
    },
    mounted: function () {
        console.log(this.employeeObj);
    },
    methods: {
        onUpdateEmployee: async function () {
            let payloadUpdate = {
                userId: this.employeeObj.user_id
            }
            let body = {
                fullName: this.employeeObj.fullName,
                phone: this.employeeObj.phone,
                address: this.employeeObj.address,
                dob: this.employeeObj.dob,
            };

            payloadUpdate.body = body

            const resUpdateUser = await this.$store.dispatch(
                "userRole/updateUserRole",
                payloadUpdate
            );

            if (resUpdateUser && !resUpdateUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Cập nhật nhân viên thành công");
                let modalUpdate = document.getElementById("updateEmployeeModal" + this.employeeObj.user_id);
                $(modalUpdate).modal("hide");

                this.$emit("onCompleteUpdate")
            } else {
                alert("Có lỗi xảy ra.Vui lòng thử lại sau");
            }
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
        }
    },
    components: {
        Datepicker,
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
