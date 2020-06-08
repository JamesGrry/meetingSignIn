<template>
  <div>
    <div style="width:200px;height:60px;background-color:rgb(48, 65, 86)">
      <!-- 会议签到后台管理系统 -->
      <img :src="logoImg" alt />
    </div>
    <el-aside width="200px" style="height:100%;background-color: rgb(48, 65, 86);color: #fff;">
      <el-menu default-active="2-2" style="height:100%">
        <div v-for="(item,ind) in routerList" :key="ind">
          <div v-if="!item.isHide">
            <el-menu-item v-if="!item.children" :index="ind+'-'+ind" @click="handlePathJump(item)">
              <!-- <i :class="item.Iconfont"></i> -->
              <svg class="diyIcon" aria-hidden="true">
                <use :xlink:href="item.Iconfont" />
              </svg>
              {{item.routeName}}
            </el-menu-item>
            <el-submenu v-else :index="ind+''">
              <template slot="title">
                <svg class="diyIcon" aria-hidden="true">
                  <use :xlink:href="item.Iconfont" />
                </svg>
                {{item.routeName}}
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(childermList,index) in item.children"
                  :key="childermList.path"
                  :index="ind+'-'+index"
                  @click="handlePathJump(childermList)"
                >
                  <svg class="diyIcon" aria-hidden="true">
                    <use :xlink:href="childermList.Iconfont" />
                  </svg>
                  {{childermList.routeName}}
                </el-menu-item>
              </el-menu-item-group>
              <!--  <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>-->
            </el-submenu>
          </div>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import logoImg from "@/assets/images/logo.png";
export default {
  data() {
    return {
      routerList: [],
      logoImg: logoImg
    };
  },
  mounted() {
    this.routerList = [
      {
        path: "/",
        name: "login",
        routeName: "",
        isHide: true
      },
      {
        path: "/login",
        name: "login",
        routeName: "",
        isHide: true
      },
      {
        path: "/index",
        name: "index",
        routeName: "首页",
        Iconfont: "#icon-1"
      },
      {
        path: "/meetingManage",
        name: "meetingManage",
        routeName: "会议管理",
        Iconfont: "#icon-2"
      },

      {
        path: "/signInList",
        // name: "",
        routeName: "签到管理",
        Iconfont: "#icon-3",
        children: [
          {
            path: "/signInList",
            name: "signInList",
            routeName: "签到列表",
            Iconfont: "#icon-3-1"
          },
          {
            path: "/signIn",
            name: "signIn",
            routeName: "会议签到",
            Iconfont: "#icon-3-2",
            component: resolve => require(["@/views/signIn"], resolve)
          }
        ]
      },
      {
        path: "/membership",
        name: "membership",
        routeName: "收纳会费",
        Iconfont: "#icon-4",
        component: resolve => require(["@/views/membership"], resolve)
      },
      {
        path: "/",
        name: "",
        routeName: "系统设置",
        Iconfont: "#icon-5",
        children: [
          {
            path: "/userManag",
            name: "userManag",
            routeName: "用户管理",
            Iconfont: "#icon-5-1",
            component: resolve =>
              require(["@/views/system/userManage"], resolve)
          }
        ]
      }
    ];
    // console.log(this.$router.options.routes);
    // for (var i in this.$router.options.routes) {
    //   this.routerList.push(this.$router.options.routes[i]);
    //   if (
    //     this.$router.options.routes[i].children &&
    //     !this.$router.options.routes[i].children.length
    //   ) {
    //     delete this.routerList[i].children;
    //   }
    // }
  },
  methods: {
    handlePathJump(val) {
      if (this.$route.path != val.path) {
        this.$router.push({ path: val.path });
      }
    }
  }
};
</script>
<style lang="sass" scoped>

</style>