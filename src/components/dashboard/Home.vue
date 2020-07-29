<template>
  <div class="row home">
    <div class="col-lg-12">
      <HeaderCmp v-bind:username="user"/>
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
  mounted(){
    let userSt = JSON.parse(window.localStorage.getItem("USER"));
    if (userSt){
      this.user = userSt.USER.username;
    }
  }
};
</script>

<style scoped>
</style>