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
                        <span class="main-title">Danh sách nhắc nợ</span>
                        <span class="sub-title">(Quản lý danh sách nhắc nợ của bạn)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account" style="padding-top:10px;padding-bottom:0px">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN NHẮC NỢ</h5>
                </div>
                <div class="col-lg-12" style="margin-top: 20px">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <multiselect v-model="statusValue" :options="statusOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo trạng thái" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-12" style="margin-bottom: 20px">
                            <multiselect v-model="sortValue" :options="sortOptions" :max="1" :multiple="true" :close-on-select="true" :clear-on-select="true" :preserve-search="true" :show-labels="false" placeholder="Lọc theo thời gian" label="text" track-by="id" :preselect-first="false" @select="onSelectCategoryJob($event)" @remove="onRemoveGender($event)" />
                        </div>
                        <div class="col-lg-6 text-right">
                            <button class="btn btn-outline-info" data-toggle="modal" data-target="#addEmployeeModal">
                                <i class="fas fa-plus-circle"></i>
                                Thêm nhắc nợ
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 table-responsive-md">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">STT</th>
                                <th scope="col" class="text-center">Họ tên</th>
                                <th scope="col" class="text-center">Số tài khoản</th>
                                <th scope="col" class="text-center">Số tiền nợ</th>
                                <th class="text-center" scope="col">Loại nhắc nợ</th>
                                <th class="text-center" scope="col">Nội dung</th>
                                  <th class="text-center" scope="col">Trạng thái</th>
                                <th class="text-center" scope="col">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DeptItemCmp />
                            <DeptItemCmp />
                        </tbody>
                    </table>
                </div>
                <div class="col-12 text-center" style="margin-top:20px">
                    <paginate :page-count="5" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index"></paginate>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm tài khoản tiết kiệm -->
    <div class="modal fade" id="addEmployeeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">THÊM NHẮC NỢ</h5>
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
                                        Số TK người nợ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Tên người nợ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="text" disabled class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="txt-user-name">
                                        Số tiền nợ
                                        <span style="color:red">(*)</span>
                                    </label>
                                    <input type="number" class="form-control" id="txt-user-name" aria-describedby="emailHelp" />
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label for="txt-info">
                                        Nội dung nhắc nợ
                                    </label>
                                    <textarea class="form-control" id="txt-info" rows="8"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <button class="btn btn-outline-success">
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
import DeptItemCmp from './list-item/DeptItemCmp'
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
        Datepicker,
        DeptItemCmp
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
