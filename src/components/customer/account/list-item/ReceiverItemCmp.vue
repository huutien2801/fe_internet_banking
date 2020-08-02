<template>
<tr>
    <td style="vertical-align: middle" class="text-center">
        <p>
            {{receiverObj.receiver_account_number}}
        </p>
    </td>
    <!--<td style="vertical-align: middle" class="text-center">
        <p> {{receiverObj.receiver_full_name}}</p>
    </td>-->
    <td style="vertical-align: middle" class="text-center">
        <p> {{receiverObj.receiver_nick_name}}</p>
    </td>
    <td class="text-center text-wrap" style="vertical-align: middle">
        <p v-if="receiverObj.is_inside == true">3TBank</p>
        <p v-else>{{receiverObj.partner_code}}</p>
    </td>
    <td class="text-center" style="vertical-align: middle">
        <span class="btn btn-outline-danger" v-if="receiverObj.is_inside == true">Nội bộ</span>
        <span class="btn btn-outline-primary" v-else>Liên ngân hàng</span>
    </td>
    <!--<td class="text-center" style="vertical-align: middle">
        <div class="dropdown">
            <button class="btn btn-outline-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item">Cập nhật</button>
                <button class="dropdown-item">Xóa</button>
            </div>
        </div>
    </td>-->
</tr>
</template>

<script>
export default {
    props: {
        receiverObj: Object
    }
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

.btn-outline-primary {
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
