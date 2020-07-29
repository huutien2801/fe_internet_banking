<template>
<div id="app" class="row">
    <div class="col-lg-12">
        <router-view :key="routerKey"></router-view>
    </div>
    <button v-on:click="this.onScrollTop" class="btn-scroll btn btn-dark" id="btn-scroll-top">
        <i class="fas fa-arrow-circle-up"></i>
    </button>
    <div class="vld-parent">
        <loading :active.sync="isLoading" loader="bars" color="#ff9f43" :height="height" :width="width" :is-full-page="fullPage"></loading>
    </div>
</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from './store/stores'
export default {
    name: "app",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            routerKey: "",
            postKeyCount: 0,
            isLoading: false,
            fullPage: true,
            height: 200,
            width: 100,
        };
    },
    components: {
        Loading
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        onScrollTop() {
            window.scrollTo(0, 0);
        },
        handleScroll() {
            let header = document.getElementById("myHeader");
            let btnScroll = document.getElementById("btn-scroll-top");
            // let listButton = document.getElementById("list-button")
            if (window.scrollY > 200) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
            if (window.scrollY > 500) {
                // btnScroll.style.display = "block";
                btnScroll.style.opacity = "1";
                // listButton.classList.add("sticky-list-button");
            } else {
                // btnScroll.style.display = "none";
                btnScroll.style.opacity = "0";
                //  listButton.classList.remove("sticky-list-button");
            }
        }
    },
    watch: {
        $route(to, from) {
            this.isLoading = this.$store.getters.isLoadingRedirect
            setTimeout(() => {
                this.isLoading = false
            }, 1000)
            window.scrollTo(0, 0);

            if (to.path == from.path) {
                this.postKeyCount++
                this.routerKey = this.$route.fullPath + this.postKeyCount
            } else {
                this.routerKey = this.$route.fullPath
            }
        },
    },
};
</script>

<style>
body {
    font-family: "Montserrat", sans-serif !important;
    transition: all 0.5s;
    overflow-x: hidden;
}

.btn-scroll {
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.5s;
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
}

.sticky-list-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 20;
    left: 30%;
}

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(40, 146, 76);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #b30000;
}
</style>
