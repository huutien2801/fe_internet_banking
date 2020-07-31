<template>
<div class="row login">
    <div class="col-6 left" style="height:97vh;background-color: #5d5dba"></div>
    <div class="col-6 right" style="height:97vh;background-color: #403964"></div>
    <div class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1" style="position:fixed">
        <div class="row">
            <div class="container">
                <div class="col-lg-12 text-center">
                    <img src style="height:100px;cursor:pointer" alt v-on:click="this.onGoToHomePage" />
                </div>
                <div class="col-lg-12 form-login">
                    <div class="row">
                        <div class="col-12 text-center" style="z-index:2;position:relative">
                            <span class="title">Đăng nhập với</span>
                        </div>
                        <div class="col-12 text-center" style="margin-top:15px">
                            <button class="btn btn-outline-success">
                                <i class="fab fa-facebook-square"></i>
                                Facebook
                            </button>
                            <button class="btn btn-outline-danger">
                                <i class="fab fa-google"></i> Google
                            </button>
                        </div>
                        <div class="col-12 text-center" style="z-index:2;position:relative;margin-top:15px">
                            <span class="title">Hoặc</span>
                        </div>
                        <div class="col-lg-12">
                            <form>
                                <!--<div class="form-group">
                                    <label for="email">Username</label>
                                    <input type="email" v-model="email" class="form-control" v-bind:class="{ 'border-error': isWrongFormatEmail || isEmptyEmail }" id="email" v-on:keydown.tab="onValidateEmail($event)" v-on:input="onValidateEmail($event)" required aria-describedby="emailHelp" />
                                    <span v-if="isWrongFormatEmail" class="error-text">Email của bạn không hợp lệ</span>
                                    <span v-if="isEmptyEmail" class="error-text">Không được bỏ trống ô này. Bạn vui lòng điền vào</span>
                                </div>-->

                                <div class="form-group">
                                    <label for="email">Username</label>
                                    <input type="text" v-model="username" class="form-control" v-bind:class="{ 'border-error': isWrongFormatEmail || isEmptyEmail }" id="email" v-on:keydown.tab="onValidateEmail($event)" v-on:input="onValidateEmail($event)" required aria-describedby="emailHelp" />

                                </div>
                                <div class="form-group">
                                    <label for="password">Mật khẩu</label>
                                    <input type="password" v-model="password" required class="form-control" v-bind:class="{ 'border-error': isWrongFormatPwd || isEmptyPwd }" v-on:keydown.tab="onValidatePassword($event)" v-on:blur="onValidatePassword($event)" id="password" />
                                    <span v-if="isWrongFormatPwd" class="error-text">Mật khẩu tối thiếu phải 8 ký tự</span>
                                    <span v-if="isEmptyPwd" class="error-text">Không được bỏ trống ô này. Bạn vui lòng điền vào</span>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-6 offset-6 text-right">
                            <button class=" btn-forgot-pwd text-right" style="padding-right:0px;padding-top:0px;padding-bottom:15px;font-size:14px" data-toggle="modal" data-target="#forgotPassword">Quên mật khẩu?</button>
                        </div>
                        <div class="col-lg-12">
                            <button type="submit" v-on:click="this.onLogin" style="width:100%" class="btn btn-outline-dark">Đăng nhập</button>
                        </div>
                        <div class="col-lg-12 text-center captcha-container" style="margin-top:20px">
                            <vue-recaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" :sitekey="this.sitekey" :loadRecaptchaScript="true"></vue-recaptcha>
                            <span v-if="this.isWrongCatcha" class="captcha-error">
                                <i class="fas fa-exclamation"></i> Captcha không đúng
                            </span>
                            <!--<button @click="resetRecaptcha"> Reset ReCAPTCHA </button>-->
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="toast" id="error-alert" role="alert" data-delay="1000" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">Thông báo</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">{{this.contentError}}</div>
    </div>

    <div class="modal fade " id="forgotPassword" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CẬP NHẬT MẬT KHẨU</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="accordion" id="accordionExample">
                        <div class="row" id="otp-email">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Email
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="email" v-model="email" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onForgotPassword">
                                    <i class="far fa-save"></i>
                                    Lấy lại mật khẩu
                                </button>
                            </div>
                        </div>
                        <div class="row" id="update-pwd" style="display:none;">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Mật khẩu mới
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="password" v-model="newPassword" class="form-control" aria-describedby="new password" />
                                </div>
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Nhập lại mật khẩu
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="password" v-model="confirmPassword" class="form-control" aria-describedby="confirm password" />
                                </div>
                                <div class="form-group">
                                    <label for="txt-user-name" style="display:block">
                                        PIN
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" v-model="PIN" class="form-control" style="display:inline-block;width:50%" aria-describedby="pin" />
                                    <button class="btn btn-outline-success" style="margin-top:-3px" id="confirm-button" @click="onConfirmPin">Xác nhận</button>
                                    <button class="btn btn-outline-success" id="tick-button" style="display:none;margin-top:-3px">
                                        <i class="fas fa-check-circle"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success" @click="onResetPassword">
                                    <i class="far fa-save"></i>
                                    Lấy lại mật khẩu
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
import VueRecaptcha from "vue-recaptcha";
import store from "../../store/modules/auth";
export default {
    name: "login-comp",
    data() {
        return {
            email: "",
            password: "",
            username: "",
            newPassword:"",
            confirmPassword:"",
            PIN:"",
            isWrongFormatEmail: false,
            isWrongFormatPwd: false,
            isEmptyPwd: false,
            isEmptyEmail: false,
            isEmptyUsername: false,
            contentError: "",
            sitekey: "6LczFKUZAAAAADB93_2XnrqUEoTTjAr7-8k8P3M6",
            secretkey: "6LczFKUZAAAAAO8YHVRNOkz3H7B5uIFPWYGzFRWm",
            responseCaptcha: "",
            isWrongCatcha: false,
            isConfirmOTP: false,
        };
    },
    methods: {
        onLogin: async function () {
            if (this.responseCaptcha == "") {
                this.isWrongCatcha = true;
            } else {
                this.isWrongCatcha = false;
            }

            if(this.isWrongCatcha == true){
                alert("Captcha bị sai. Vui lòng thực hiện lại")
                return
            }
            // let email = this.email;
            let password = this.password;

            let bodyLogin = {
                username: this.username,
                password: password
            };

            // this.isEmptyEmail = bodyLogin.email == "" ? true : false;
            this.isEmptyPwd = bodyLogin.password == "" ? true : false;
            if (this.username == '' || this.isEmptyPwd) {
                this.contentError =
                    "Bạn vẫn chưa điền đủ thông tin. Vui lòng điền đầy đủ nội dung đăng ký !";
                $("#error-alert").toast("show");
                return;
            }

            // this.onValidateEmailValue(email);
            this.onValidatePasswordValue(password);
            // if (this.isWrongFormatEmail) {
            //     this.contentError =
            //         "Email nhập vào của bạn không hợp lệ. Vui lòng thay đổi email và thử lại !";
            //     $("#error-alert").toast("show");
            //     return;
            // }

            if (this.isWrongFormatPwd) {
                this.contentError =
                    "Mật khẩu của bạn không hợp lê. Vui lòng thay đổi email và thử lại!";
                $("#error-alert").toast("show");
                return;
            }

            const res = await this.$store.dispatch("auth/login", bodyLogin);
            if (res.status == "OK") {
                alert("Đăng nhập thành công!");
                switch (res.data.role_code) {
                    case "ADMIN":
                        this.$router.push("/admin");
                        break;
                    case "EMPLOYEE":
                        this.$router.push("/employee");
                        break;
                    case "CUSTOMER":
                        this.$router.push("/customer");
                        break;
                    default:
                        this.$router.push("/");
                        break;
                }

            } else {
                if (res.errorCode == "PASSWORD_NOT_MATCH") {
                    alert("Mật khẩu không chính xác!");
                } else if (res.errorCode == "INVALID_EMAIL") {
                    alert("Email vẫn chưa được đăng ký");
                } else {
                    alert("Đã xảy ra lỗi. Vui lòng thử lại sau");
                }
            }

            // this.$refs.recaptcha.execute()
        },
        onGoToRegisterPage() {
            this.$router.push("/register");
        },
        onGoToHomePage() {
            this.$router.push("/");
        },
        onValidateEmail(e) {
            if (e.target.value.length < 1) {
                this.isEmptyEmail = true;
                this.isWrongFormatEmail = false;
            } else {
                this.isEmptyEmail = false;
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let isRight = re.test(String(e.target.value).toLowerCase());
                this.isWrongFormatEmail = !isRight;
            }
        },
        onValidatePassword(e) {
            if (e.target.value.length < 1) {
                this.isEmptyPwd = true;
                this.isWrongFormatPwd = false;
            } else {
                this.isEmptyPwd = false;
                this.isWrongFormatPwd = e.target.value.length < 6 ? true : false;
            }
        },
        onValidateUsername(e) {
            if (e.target.value.length < 1) {
                this.isEmptyUsername = true;
            } else {
                this.isEmptyUsername = false;
            }
        },
        onValidateEmailValue(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let isRight = re.test(String(email).toLowerCase());
            this.isWrongFormatEmail = !isRight;
        },
        onValidatePasswordValue(pwd) {
            this.isWrongFormatPwd = pwd.length < 6 ? true : false;
        },
        onSubmit: function () {
            this.$refs.invisibleRecaptcha.execute();
        },
        onVerify: function (response) {
            this.responseCaptcha = response;
        },
        onExpired: function () {
            console.log("Expired");
        },
        resetRecaptcha() {
            this.$refs.recaptcha.reset(); // Direct call reset method
        },
        async onForgotPassword(){
            let payload = {
                email:this.email
            }
            const res = await this.$store.dispatch("otp/createOTPMail", payload);
            if (res && !res.error) {
                document.getElementById('otp-email').style.display = 'none'
                document.getElementById('update-pwd').style.display = 'block'
            }
        },
        async onResetPassword(){
            if (this.isConfirmOTP){
                if (this.newPassword != this.confirmPassword){
                    alert('Xác nhận mật khẩu sai. Vui lòng nhập lại')
                } else {
                    let payload = {
                        email:this.email,
                        newPassword:this.newPassword
                    }
                    const res = await this.$store.dispatch("userRole/resetPassword", payload);
                    if (res && !res.error){
                        alert('Cập nhật mật khẩu thành công. Đăng nhập lại để vào hệ thống');
                        $('#forgotPassword').modal('hide');
                    }
                }
                
            }else {
                alert('Bạn phải xác nhận mã OTP trước');
            }
        },
        async onConfirmPin(){
            let payload = {
                email:this.email,
                OTP:this.PIN
            }
            const res = await this.$store.dispatch("otp/confirmOTP", payload);
            if (res && !res.error){
                document.getElementById('confirm-button').style.display = 'none';
                document.getElementById('tick-button').style.display = 'inline-block';
                this.isConfirmOTP = true;
            } else {
                alert('Nhập sai mã PIN vui lòng kiểm tra email và nhập lại');
            }
        }
    },
    mounted: function () {
        let user = window.localStorage.getItem("USER")
        if (user) {
            this.$router.push("/");
        }
    },
    components: {
        VueRecaptcha
    }
};
</script>

<style>
.btn-forgot-pwd {
    background: transparent;
    border: none;
}

#error-alert {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 100;
}

.error-text {
    text-transform: initial !important;
    color: red !important;
    font-size: 12px !important;
}

.captcha-error {
    text-transform: initial !important;
    color: red !important;
    font-size: 12px !important;
}

.border-error {
    border: 1px solid red;
    box-shadow: 1px 0px 6px 0px #e58585;
}

.left {
    background-position: center;
}

.captcha-container>div>div {
    width: 100% !important;
}

.right {
    background-position: center;
}

.nav-link {
    color: blue;
}

.form-login {
    padding: 15px;
    background-color: rgb(255, 255, 255);
    top: 40px;
    box-shadow: 2px 1px 4px 1px #404c70;
    border-radius: 4px;
}

.form-login span {
    text-transform: uppercase;
    font-weight: bold;
    color: black;
}

.title::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    background-color: rgb(54, 52, 52);
    width: 100%;
    z-index: -1;
}

.title {
    display: inline-block;
    padding-left: 12px;
    padding-right: 12px;
    z-index: 1;
    font-size: 18px;
    background: white;
}
</style>
