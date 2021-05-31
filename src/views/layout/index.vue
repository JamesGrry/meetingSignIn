<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <div style="background-color:rgb(48, 65, 86)">
      <lef-aside-menu></lef-aside-menu>
    </div>
    <el-container>
      <top-header-container></top-header-container>
      <el-main>
        <el-card style="height:calc(100% - 2px);overflow:auto;padding:0" class="box-card">
          <router-view></router-view>
        </el-card>
      </el-main>
      <el-footer style="height:40px">
        <bottom-footer></bottom-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import lefAsideMenu from "./leftAsideMenu";
import topHeaderContainer from "./topHeaderContainer";
import bottomFooter from "./bottomFooter";
export default {
  components: {
    lefAsideMenu,
    topHeaderContainer,
    bottomFooter
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.box-card {
  .el-card__body {
    height: calc(100% - 40px);
  }
}
</style>