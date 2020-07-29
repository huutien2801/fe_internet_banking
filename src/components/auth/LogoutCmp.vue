<template>
</template>

<script>
export default {
    name: "logout-comp",
    mounted: function () {
        window.localStorage.clear()
        this.$router.push("/");
    },
};
</script>

<style>
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
