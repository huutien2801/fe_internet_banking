<template>
<tr>
    <th scope="row text-center" style="vertical-align: middle">{{indexCount + 1}}</th>
    <td style="vertical-align: middle" class="text-center">{{partnerObj.partner_code}}</td>
    <td style="vertical-align: middle" class="text-center">
        <p>{{partnerObj.partner_name}}</p>
    </td>
    <td class="text-center text-wrap" style="vertical-align: middle">
        <p>{{partnerObj.created_at | moment("DD/MM/YYYY")}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Cập nhật</button>
                <button class="dropdown-item">Xóa</button>
            </div>
        </div>
    </td>
</tr>
</template>

<script>
export default {
    props: {
        partnerObj: Object,
        indexCount: Int8Array,
    },
    mounted(){
        console.log(this.partnerObj)
    }
};
</script>

<style scoped>
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
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
