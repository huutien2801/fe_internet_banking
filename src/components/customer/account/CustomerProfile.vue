<template>
<div class="row">
    <div class="col-lg-12">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-1" style="padding-right:0px">
                    <i class="fas fa-user-circle icon-title"></i>
                </div>
                <div class="col-lg-11" style="padding-left:0px">
                    <div class="header-title">
                        <span class="main-title">Thông tin cá nhân khách hàng</span>
                        <span class="sub-title">(Thông tin cá nhân của khách hàng được lưu trữ bởi 3TBank)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN CÁ NHÂN</h5>
                </div>
                <div class="col-lg-12" style="margin-top:10px">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Họ tên
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled :value="user.full_name" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Email
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="email" disabled v-model="user.email" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Ngày tháng năm sinh
                                </label>
                                <div style="background: #e9ecef;padding: 8px;border: 1px solid #e3e7ea; border-radius: 5px;">
                                    {{user.dob | moment("DD/MM/YYYY")}}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số điện thoại
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="number" :value="user.phone" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    CMND
                                </label>
                                <input type="number" :value="user.identity_number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
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
                                <input type="text" v-model="user.address" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 text-left" style="margin-bottom:10px">
                    <button class="btn btn-outline-info" @click="onUpdateProfile" data-toggle="modal" data-target="">
                        <i class="fas fa-edit"></i>
                        Cập nhật
                    </button>
                    <button class="btn btn-outline-danger" data-toggle="modal" data-target="#changePassword">
                        <i class="fas fa-cog"></i>
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal đổi mật khẩu -->
    <div class="modal fade" id="changePassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ĐỔI MẬT KHẨU</h5>
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
                                        Mật khẩu hiện tại
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="password" v-model="oldPassword" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Mật khẩu mới
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="password" v-model="newPassword" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Xác nhận mật khẩu
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="password" v-model="confirmPassword" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onChangePassword">
                                    <i class="far fa-save"></i>
                                    Xác nhận đổi
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
            user: {},
            genderValue: null,
            genderOptions: [],
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
    },
    methods: {
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
        onUpdateProfile: async function () {

            if (this.user.address == '') {
                alert("Vui lòng điền địa chỉ hiện tại của bạn")
                return
            }

            // if (this.user.email == '') {
            //     alert("Vui lòng điền email của bạn")
            //     return
            // }

            if (this.genderValue != null && this.genderValue[0] != undefined) {
                this.user.gender = this.genderValue[0].id;
            }

            let payloadUpdate = {
                userId: this.user.user_id
            }

            let body = {
                address: this.user.address,
                gender: this.user.gender
            };

            payloadUpdate.body = body

            const resUpdateUser = await this.$store.dispatch(
                "userRole/updateUserRole",
                payloadUpdate
            );

            if (resUpdateUser && !resUpdateUser.error) {
                // khi BE trả ra 200 sẽ nhảy vào đây
                alert("Cập nhật thông tin cá nhân thành công");

                let respGetMe = await this.$store.dispatch("user/getMe", {})
                if (respGetMe && !respGetMe.error) {
                    window.localStorage.removeItem("USER")
                    let userInfo = {
                        USER: respGetMe.data.data,
                        //STATUS: response.data.user.status,
                    }
                    window.localStorage.setItem("USER", JSON.stringify(userInfo))
                    this.user = respGetMe.data.data
                }
            } else {
                alert("Có lỗi xảy ra.Vui lòng thử lại sau");
            }
        },
        onChangePassword: async function () {

            if (this.oldPassword == '') {
                alert("Vui lòng điền mật khẩu hiện tại")
                return
            }

            if (this.newPassword == '') {
                alert("Vui lòng nhập mật khẩu mới")
                return
            }

            if (this.confirmPassword == '') {
                alert("Vui lòng nhập mật khẩu xác nhận")
                return
            }

            if (this.oldPassword == this.newPassword) {
                alert("Mật khẩu mới và mật khẩu cũ không được trùng nhau. Bạn vui lòng thay đổi mật khẩu mới")
                return
            }

            if (this.confirmPassword != this.newPassword) {
                alert("Mật khẩu xác nhận không đúng. Vui lòng thử lại")
                return
            }

            let payload = {
                body: {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }
            }

            let respChangePwd = await this.$store.dispatch("userRole/changePassword", payload)
            let changePasswordModal = document.getElementById("changePassword")
            if (respChangePwd && !respChangePwd.error) {
                alert("Thay đổi mật khẩu thành công!")
            } else {
                alert('Thay đổi mật khẩu thất bại. Bạn vui lòng thử lại sau')
            }
            $(changePasswordModal).modal("hide")
        }
    },
    mounted: async function () {
        let userSt = JSON.parse(window.localStorage.getItem("USER"));
        if (userSt) {
            this.user = userSt.USER;
        }
        this.genderOptions = this.getGender()

        let genderInfo = this.genderOptions.find(gender => {
            return gender.id == this.user.gender
        })
        
        this.genderValue = {
            id: this.user.gender,
            text: genderInfo.text
        }
    },
    components: {
        Multiselect,
        Paginate,
        AccountItemCmp,
        Datepicker
    }
};
</script>

<style scoped>
.container-account {
    box-shadow: 1px 0px 10px 1px #ebebeb;
    padding-top: 10px;
    padding-bottom: 5px;
    border-radius: 5px;
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
