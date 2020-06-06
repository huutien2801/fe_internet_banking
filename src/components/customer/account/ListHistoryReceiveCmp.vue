<template>
<div class="row">
    <div class="col-lg-12">
        <div class="container">
            <div class="row container-account">
                <div class="col-lg-1" style="padding-right:0px">
                    <i class="fas fa-arrow-alt-circle-left icon-title"></i>
                </div>
                <div class="col-lg-11" style="padding-left:0px">
                    <div class="header-title">
                        <span class="main-title">Lịch sử nhận tiền</span>
                        <span class="sub-title">(Quản lý danh sách nhận tiền từ người khác)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12" style="margin-top:20px">
        <div class="container">
            <div class="row container-account" style="padding-top:10px;padding-bottom:10px">
                <div class="col-lg-12" style="border-bottom: 1px solid #ebebeb">
                    <h5>THÔNG TIN NHẬN TIỀN</h5>
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

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from "vuejs-datepicker";
import HistoryReceiveItemCmp from './list-item/HistoryReceiveItemCmp'
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
