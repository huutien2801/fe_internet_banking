<template>
<div class="row">
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-1" style="padding-right:0px">
                <i class="fas fa-handshake icon-title"></i>
            </div>
            <div class="col-lg-11" style="padding-left:0px">
                <div class="header-title">
                    <span class="main-title">Danh sách đối tác</span>
                    <span class="sub-title">(Danh sách những ngân hàng liên kết với 3TBank)</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12 table-responsive-md" style="margin-top:20px">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col" class="text-center">Mã đối tác</th>
                    <th scope="col" class="text-center">Tên đối tác</th>
                    <th class="text-center" scope="col">Ngày liên kết</th>
                    <th class="text-center" scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <PartnerItemCmp v-for="(partner,index) in listPartner" :key="partner._id" :indexCount="index" :partnerObj="partner" />
            </tbody>
        </table>
    </div>

    <div class="col-12 text-center" style="margin-top:20px">
        <paginate :page-count="lastIndex" :prev-text="'&#8249;'" :next-text="'&#8250;'" :first-last-button="true" :last-button-text="'&#187;'" :first-button-text="'&#171;'" :container-class="'pagination'" :page-class="'page-item'" :page-link-class="'page-link'" :next-link-class="'page-link'" :prev-link-class="'page-link'" :click-handler="onPaginationClick" :hide-prev-next="true" v-model="index">
        </paginate>
    </div>

</div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Paginate from "vuejs-paginate";
import Datepicker from 'vuejs-datepicker';
import EmployeeItemCmp from "./list-item/EmployeeItemCmp";
import PartnerItemCmp from './list-item/PartnerItemCmp'
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
            index: 1,
            limit: 2,
            lastIndex: 0,
            totalPartner: 0,
            listPartner: [],
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
        onPaginationClick: async function (pageNumber) {
            let payload = {
                limit: this.limit,
                offset: (this.index - 1) * this.limit,
            }
            let q = {}
            payload.q = q

            const res = await this.$store.dispatch("userRole/getPartner", payload);

            if (res && !res.error) {

                this.listPartner = res.data.partners;
                this.totalPartner = res.data.total;
                if (res.data.total % this.limit == 0) {
                    this.lastIndex = res.data.total / this.limit;
                } else {
                    this.lastIndex = parseInt(res.data.total / this.limit) + 1;
                }
            }
        },
    },
    mounted: async function () {
        let payload = {
            limit: this.limit,
            offset: (this.index - 1) * this.limit,
        }
        let q = {}
        payload.q = q

        const res = await this.$store.dispatch("userRole/getPartner", payload);

        if (res && !res.error) {

            this.listPartner = res.data.partners;
            this.totalPartner = res.data.total;
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
        EmployeeItemCmp,
        PartnerItemCmp,
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
