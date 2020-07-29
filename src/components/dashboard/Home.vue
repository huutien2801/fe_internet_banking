<template>
<div class="row home">
    <div class="col-lg-12">
        <HeaderCmp v-bind:username="user" />
    </div>
    <div class="col-lg-12">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import HeaderCmp from "../common/HeaderCmp";
export default {
    components: {
        HeaderCmp
    },
    data() {
        return {
            user: ""
        };
    },
    mounted() {
        let userSt = JSON.parse(window.localStorage.getItem("USER"));
        if (userSt) {
            this.user = userSt.USER.username;
            switch (userSt.USER.role_code) {
                case "ADMIN":
                    this.$router.push('/admin')
                    break;
                case "EMPLOYEE":
                    this.$router.push('/employee')
                    break;
                case "CUSTOMER":
                    this.$router.push('/customer')
                    break;
                default:
                    break;
            }
        } else {
            this.$router.push('/login')
        }
    }
};
</script>

<style scoped>
</style>
