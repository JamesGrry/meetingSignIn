import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const recom = {
  template: `<router-view></router-view>`
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      routeName: "",
      isHide: true,
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      routeName: "",
      isHide: true,
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: "/index",
      name: "index",
      routeName: "首页",
      component: resolve => require(['@/views/homePage'], resolve)
    },
    {
      path: "/meetingManage",
      name: "meetingManage",
      routeName: "会议管理",
      component: resolve => require(['@/views/meetingManage'], resolve),
      children: []
    },
    {
      path: "/signInList",
      name: "signInList",
      routeName: "签到列表",
      component: resolve => require(['@/views/signInList'], resolve),
    },
    {
      path: "/signIn",
      name: "signIn",
      routeName: "会议签到",
      component: resolve => require(['@/views/signIn'], resolve),
    },
    // {
    //   path: "/signInList",
    //   // name: "",
    //   routeName: "签到管理",
    //   children: [
    //   ]
    // },
    {
      path: "/membership",
      name: "membership",
      routeName: "收纳会费",
      component: resolve => require(['@/views/membership'], resolve),
    },
    {
      path: "/userManag",
      name: "userManag",
      routeName: "用户管理",
      component: resolve => require(['@/views/system/userManage'], resolve),
    }
    // {
    //   path: "/",
    //   name: "",
    //   routeName: "系统设置",
    //   children: []
    // }
  ]
})
