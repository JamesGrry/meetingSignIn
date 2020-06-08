<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <div
        style="width:280px;font-size:15px;text-align:left;float:left;color:#fff;font-weight:bold"
      >欢迎来到会议签到后台管理系统管理系统</div>
      <el-dropdown
        style="color: rgb(255, 255, 255);line-height: 60px;display: flex; align-items: center;height: 60px;justify-content: flex-end;"
      >
        <img
          style="width:40px;height:40px;border-radius:10px;margin-right:10px"
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          alt
          srcset
        />
        <i class="el-icon-setting" style="margin-right: 15px;">
          <span>{{loginUserName}}</span>
        </i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="handleLoginOut">退出登录</div>
          </el-dropdown-item>
          <!-- <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-button @click="handleLoginOut">asdasd</el-button> -->
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginUserName: ""
    };
  },
  mounted() {
    this.loginUserName = this.$store.getters.getUserInfo;
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch("removeUser");
    }
  }
};
</script>
<style lang="sass" scoped>

</style>