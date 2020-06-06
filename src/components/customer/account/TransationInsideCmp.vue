<template>
<div class="row">
    <div class="col-lg-12">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-1" style="padding-right:0px">
                    <i class="fas fa-exchange-alt icon-title"></i>
                </div>
                <div class="col-lg-11" style="padding-left:0px">
                    <div class="header-title">
                        <span class="main-title">Chuyển khoản nội bộ</span>
                        <span class="sub-title">(Chuyển khoản trong nội bộ ngân hàng 3TBank)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN CHUYỂN KHOẢN</h5>
                </div>
                <div class="col-lg-12" style="margin-top:10px">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số tài khoản
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                              <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Tên người nhận
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số dư hiện tại
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                            <div class="col-lg-6">
                            <div class="form-group">
                                <label for="txt-user-name">
                                    Số tiền muốn chuyển
                                    <span style="color:red">(*)</span>
                                </label>
                                <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 text-left" style="margin-bottom:10px">
                    <button class="btn btn-outline-info" data-toggle="modal" data-target="">
                        <i class="fas fa-save"></i>
                        Lưu thông tin người nhận
                    </button>
                    <button class="btn btn-outline-danger" data-toggle="modal" data-target="#changePassword">
                        <i class="fas fa-paper-plane"></i>
                        Chuyển
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
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Mật khẩu mới
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button disabled class="btn btn-outline-success">
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
            index: 1
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
