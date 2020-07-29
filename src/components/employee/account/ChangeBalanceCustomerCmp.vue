<template>
<div class="row" style="margin-right:5px">
    <div class="col-lg-12">
        <div class="row container-account">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-user-circle icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Thay đổi số dư</span>
                    <span class="sub-title">(Trang nạp tiền vào tài khoản của khách hàng 3TBank)</span>
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
                            <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Tên đăng nhập
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button class="btn btn-primary">
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
                <h5>THÔNG TIN TÀI KHOẢN</h5>
            </div>
            <div class="col-lg-12" style="margin-top: 20px">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Số tài khoản
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="number" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Họ tên khách hàng
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                CMND
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Ngày cấp
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Email
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Ngày tháng năm sinh
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Điện thoại
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="txt-user-name">
                                Địa chỉ
                                <span style="color:red">(*)</span>
                            </label>
                            <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <button class="btn btn-primary" data-toggle='modal' data-target="#addBalanceModal">
                            TIẾN HÀNH NẠP TIỀN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="addBalanceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">NẠP TIỀN VÀO TÀI KHOẢN</h5>
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
                                        Nhập số tiền muốn nạp
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                      
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success">
                                    <i class="far fa-save"></i>
                                    NẠP
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
