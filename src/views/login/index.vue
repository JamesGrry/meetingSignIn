<template>
  <div
    style="height:100%;width:100%;background:url('https://i.picsum.photos/id/1000/1920/1080.jpg')"
  >
    <div class="login">
      <div class="login_main">
        <div class="main_left"></div>
        <div class="main_right">
          <h2 style="margin-top: 50px;font-size:20px;font-weight:bold">会议签到管理系统</h2>
          <form action="/login" method="post" style="margin-top: 40px;">
            <div class="username">
              <img src="../../assets/images/username.png" alt />
              <input type="text" placeholder="请输入用户名" v-model="loginData.username" name="username" />
            </div>
            <div class="password">
              <img src="../../assets/images/password.png" alt />
              <input
                placeholder="请输入密码"
                v-model="loginData.password"
                name="password"
                type="password"
                @keydown.13="handleLogin"
              />
            </div>
            <div class="yes_login">
              <button type="button" @click="handleLogin">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      style="position: absolute;bottom: 0;color:#fff;width:100%;text-align:right;line-height:50px;right:100px"
    >
      @www.grry.top Mr.Zhan
      <a
        style="color:#fff;"
        href="http://beian.miit.gov.cn/"
        target="_blank"
      >浙ICP备20016204号-1</a>
    </div>
  </div>
</template>
<script>
import { getArchivesList } from "@/api/login/login.js";
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    // this.$store.dispatch("setUser", "ismyusr");
  },
  methods: {
    /**
     * 点击登录
     */
    handleLogin() {
      this.requestGetArchivesList(this.loginData);
    },
    /**
     * 登录请求
     */
    requestGetArchivesList(params) {
      getArchivesList(params).then(result => {
        if (result.state == 200) {
          this.$store.dispatch("setUser", result.data.username);
          this.$router.push({ path: "index" });
          this.$message({
            message: "登录成功！欢迎" + result.data.realName,
            type: "success"
          });
        } else {
          this.$message.error(result.message);
        }
      });
    }
  }
};
</script>
<style scoped>
/*签到界面*/

/*css 初始化 */

ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}

/*将标签原有的默认内外边距去掉*/

fieldset,
img,
input,
button {
  border: none; /*去掉边框*/
  padding: 0;
  margin: 0;
  outline-style: none; /*去掉环绕边框*/
}
h2 {
  color: #3887fe;
  font-size: 22px;
  text-align: center;
  line-height: 25px;
  font-weight: 600;
}
ul,
ol {
  list-style: none; /*去掉原样式中的小黑点*/
  /*ctrl+alt+l*/
}

input {
  padding-top: 0;
  padding-bottom: 0;
}

select,
input {
  vertical-align: middle; /*输入字居中显示*/
}

select,
input,
textarea {
  font-size: 14px;
  margin: 0;
}

/**/
textarea {
  resize: none; /*防止拖动*/
}

img {
  border: 0;
  vertical-align: middle; /*  去掉图片底部默认的3像素空白缝隙*/
}

table {
  border-collapse: collapse; /*合并外边线*/
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1; /*IE/7/6*/
  /*兼容IE6下的写法*/
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none; /**/
  font-weight: normal; /*不加粗*/
  font-size: 100%;
}

/*login 开始*/
.login {
  width: 1000px;
  height: 500px;
  /*background-color: yellowgreen;*/
  position: absolute;
  left: 50%;
  top: 45%;
  margin-left: -500px;
  margin-top: -250px;
}
.login > .login_title {
  height: 80px;
  text-align: center;
}
.login > .login_title > p {
  color: #3887fe;
  font-size: 40px;
  font-weight: 600;
  margin-top: -8px;
  letter-spacing: 5px;
}
.login > .login_main {
  width: 850px;
  height: 400px;
  margin-left: 120px;
  margin-top: 20px;
  /* box-shadow: 5px 5px 5px #cadbf9; */
}
.login > .login_main > .main_left {
  height: 400px;
  width: 400px;
  float: left;
  -moz-border-top-left-radius: 10px;
  -webkit-border-top-left-radius: 10px;
  border-top-left-radius: 10px;

  -moz-border-bottom-left-radius: 10px;
  -webkit-border-bottom-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: url("../../assets/images/login_03.png") no-repeat;
}
.login > .login_main > .main_right {
  height: 400px;
  width: 450px;
  float: right;
  background-color: #ffffff;
  -moz-border-top-right-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  border-top-right-radius: 10px;

  -moz-border-bottom-right-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.login > .login_main > .main_right > .right_title {
  color: #251e5f;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 60px;
  /* background: url("../../assets/images/border_img.png") repeat; */
  margin-bottom: 25px;
}
.login > .login_main > .main_right > form > div {
  position: relative;
}
.login > .login_main > .main_right > form > div > img {
  position: absolute;
  left: 82px;
  top: 12px;
}
.login > .login_main > .main_right > form input {
  height: 45px;
  width: 300px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  margin-bottom: 30px;
  margin-left: 70px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  color: #333;
  padding-left: 40px;
}

.login > .login_main > .main_right > form > .code > input {
  width: 150px;
}
.login > .login_main > .main_right > form > .code > .code_img {
  width: 90px;
  height: 35px;
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
.login > .login_main > .main_right > form input:focus {
  border: 1px solid #999;
}
.login > .login_main > .main_right > form > .yes_login > button {
  margin-top: 10px;
  display: block;
  width: 300px;
  height: 45px;
  font-size: 14px;
  line-height: 45px;
  text-align: center;
  background-color: #3887fe;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  color: #fff;
  text-decoration: none;
  margin-left: 70px;
}
.login > .login_main > .main_right > form > .yes_login > button:hover {
  background-color: #0058af;
}
.login > .login_footer {
  text-align: center;
  padding-top: 20px;
}
.login > .login_footer > p {
  font-size: 14px;
  color: #eee;
  line-height: 30px;
}

/*login 结束*/
</style>

