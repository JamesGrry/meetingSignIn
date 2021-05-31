<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" /> -->
    <!-- <router-view /> -->
    <main-page v-if="loginUserId"></main-page>
    <login-page v-else></login-page>
  </div>
</template>

<script>
import mainPage from "@/views/layout";
import loginPage from "@/views/login";
export default {
  name: "App",
  components: { mainPage, loginPage },
  data() {
    return {};
  },
  computed: {
    loginUserId() {
      console.log(this.$store.getters.getUserInfo)
      return this.$store.getters.getUserInfo;
    }
  }
};
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
.el-header {
  background-color: rgb(84, 119, 219);
  color: #fff;
  line-height: 60px;
}

.el-aside {
  color: #fff;
}
.el-menu {
  background-color: rgb(48, 65, 86);
  color: #fff;
}
.el-menu-item,
.el-submenu__title {
  color: #fff;
}

/*修改滚动条样式*/
div::-webkit-scrollbar{
  width:6px;
  height:10px;
  /**/
}
div::-webkit-scrollbar-track{
  background: rgba(255, 255, 255, 0.699);
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #bfbfbfb7;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #333;
}
div::-webkit-scrollbar-corner{
  background: #ffffff;
}
</style>
<style lang="scss">
@import "@/assets/css/public.scss";
</style>
