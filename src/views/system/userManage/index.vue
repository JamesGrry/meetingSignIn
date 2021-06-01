<template>
  <div id="userManage">
    <div class="seacrchBox">
      <div class="btnAddedUser">
        <div class="btnbox">
          <el-button type="primary" @click="onAddDialog">新增用户</el-button>
        </div>
      </div>
      <el-table :data="userTableList" v-loading="userListPage.loading" max-height="450" stripe style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="realname" label="真实姓名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="ordSeeDetails(scope.row)">编 辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination class="tablePagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userListPage.page" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="userListPage.total"></el-pagination>
      </div>
    </div>
    <!-- 新增用户和编辑用户start -->
    <el-dialog :title="dialogUserModify.dialogTitle" :visible.sync="dialogUserModify.dialogYnc" :close-on-click-modal="false" width="450px" class="userInfoDialog">
      <div>
        <el-form :model="userInfo" status-icon :rules="userDialogRules" ref="userDialogRules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="userInfo.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input type="text" v-model="userInfo.realname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="dialogUserModify.dialogIsAddUser==true" class="formInput" label="角色权限">
            <el-select v-model="userInfo.role" placeholder="请选择">
              <el-option v-for="item in roleList" :key="item.authorityCorresponding" :label="item.authorityNotes" :value="item.authorityCorresponding"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="dialogUserModify.dialogIsAddUser==true" label="登录密码" prop="password">
            <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item v-if="dialogUserModify.dialogIsAddUser==false" label="是否启用" prop="disabled">
            <el-radio-group v-model="userInfo.disabled">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item v-if="dialogUserModify.dialogIsAddUser==true" label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="userInfo.confirmPassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUserModify.dialogYnc=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userDialogRules')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增用户和编辑用户end -->
  </div>
</template>
<script>
import {
  getUserList,
  getRole,
  setEditUserInfo,
  setSaveUser
} from '@/api/system/userManage/userManage.js'
// import "./index.less";
import { swalSuccessInfo, swalErrorInfo } from '@/assets/js/common.js'
export default {
  data () {
    var ruleUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var rulerealname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('真实姓名不能为空'))
      }
      callback()
    }
    var rulePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userInfo.confirmPassword !== '') {
          this.$refs.userDialogRules.validateField('confirmPassword')
        }
        callback()
      }
    }
    var ruleConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userInfo.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      userTableList: [],
      dialogUserModify: {
        dialogTitle: '新增用户',
        dialogYnc: false,
        dialogIsAddUser: true
      },
      locationAddress: [],
      SearchFrom: {
        webSite: '',
        keyword: '',
        userAddress: ''
      },
      userInfo: {
        username: '',
        realname: '',
        password: '',
        disabled: true,
        confirmPassword: '',
        agencies: '',
        role: ''
      },
      userDialogRules: {
        username: [{ validator: ruleUsername, trigger: 'blur' }],
        realname: [{ validator: rulerealname, trigger: 'blur' }],
        password: [{ validator: rulePassword, trigger: 'blur' }],
        confirmPassword: [{ validator: ruleConfirmPass, trigger: 'blur' }]
      },
      // formCondition: {
      //   levelOne: "",
      //   levelTwo: "",
      //   levelThere: ""
      // },
      // levelList: {
      //   levelOne: [],
      //   levelTwo: [],
      //   levelThere: []
      // },
      // levelListParms: {
      //   level: 1
      // },
      editUserInfo: {},
      userListPage: {
        loading: true,
        total: 0,
        page: 0
      },
      userListParms: {
        username: '',
        size: 10,
        page: 0
      },
      roleList: []
    }
  },
  mounted () {
    this.requestGetUserList(this.userListParms)
    this.requestgetRole()
  },
  methods: {
    /**
     * 表单提交
     */
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogUserModify.dialogIsAddUser) {
            let parms = {
              username: this.userInfo.username,
              realname: this.userInfo.realname,
              password: this.userInfo.password,
              // agencyCode: this.userInfo.agencies,
              jurisdiction: this.userInfo.role
              // regionId: this.formCondition.levelThere
            }
            this.requestSetSaveUser(parms)
          } else {
            let parms = {
              id: this.userInfo.id,
              username: this.userInfo.username,
              // disabled: this.userInfo.disabled,
              // enable: this.userInfo.enable,
              realname: this.userInfo.realname
            }
            this.requestSetEditUserInfo(parms)
          }
        } else {
          swalErrorInfo('请检查您的信息！')
          return false
        }
      })
    },
    /**
     * 编辑按钮
     */
    ordSeeDetails (row) {
      this.userInfo = JSON.parse(JSON.stringify(row))
      // this.editUserInfo = row;
      this.dialogUserModify = {
        dialogTitle: '编辑用户',
        dialogYnc: true,
        dialogIsAddUser: false
      }
    },
    /**
     * 重置新增用户表单
     */
    resetForm (formName) {
      setTimeout(() => {
        this.$refs[formName].resetFields()
        this.dialogUserModify.dialogYnc = false
      }, 500)
    },
    /**
     * 新增按钮
     */
    onAddDialog () {
      setTimeout(() => {
        this.$refs['userDialogRules'].resetFields()
      }, 100)
      this.dialogUserModify = {
        dialogTitle: '新增用户',
        dialogYnc: true,
        dialogIsAddUser: true
      }
      this.userInfo = {
        username: '',
        realname: '',
        password: '',
        confirmPassword: ''
      }
    },
    /**
     * 搜索用户
     */
    btnSeniorSearch () {
      var parms = {
        username: this.SearchFrom.webSite,
        keyword: this.SearchFrom.keyword,
        regionId: this.SearchFrom.userAddress,
        size: 10
      }
      this.requestGetUserList(parms)
    },
    /**
     * 改变列表limit
     */
    handleSizeChange (val) {
      this.userListParms.size = val
      this.requestGetUserList(this.userListParms)
    },
    /**
     * 改变列表page
     */
    handleCurrentChange (val) {
      this.userListParms.page = val - 1
      this.requestGetUserList(this.userListParms)
    },
    /**
     * 角色列表
     */
    requestgetRole (params) {
      getRole(params).then(result => {
        console.log(result)
        this.roleList = result.content
      })
    },
    /**
     * 编辑用户
     */
    requestSetEditUserInfo (val) {
      setEditUserInfo(val).then(result => {
        this.requestGetUserList(this.userListParms)
        this.dialogUserModify = {
          dialogTitle: '',
          dialogYnc: false,
          dialogIsAddUser: false
        }
      })
    },
    // requestGetRole(params) {
    //   getRole(params).then(result => {
    //     console.log(result);
    //   });
    // },
    /**
     * 获取用户列表
     */
    requestGetUserList (val) {
      this.userListPage.loading = true
      getUserList(val).then(result => {
        console.log(result)
        this.userTableList = result.content
        this.userListPage.page = result.page + 1
        this.userListPage.total = result.total
        this.userListPage.loading = false
      })
    },
    /**
     * 新增用户
     */
    requestSetSaveUser (val) {
      setSaveUser(val).then(result => {
        swalSuccessInfo('新增成功！')
        this.requestGetUserList(this.userListParms)
        this.dialogUserModify = {
          dialogTitle: '',
          dialogYnc: false,
          dialogIsAddUser: false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#userManage {
  .seacrchBox {
    .btnAddedUser {
      .btnbox {
        button {
          float: right;
        }
      }
    }
  }
  .userInfoDialog {
    .el-select {
      width: 100%;
    }
  }
}
</style>
