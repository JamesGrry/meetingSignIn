
<template>
  <div id="signInList">
    <div class="searchBox">
      <div>
        <el-autocomplete
          v-model="signInListData.meetingId"
          :fetch-suggestions="querySearchAsync"
          placeholder="选择会议"
          @select="handleSelect"
          @input="handleChoice"
          size="small"
        ></el-autocomplete>
        <el-button
          type="primary"
          size="small"
          :disabled="isChoiceMeeting"
          @click="handleSignIn"
          icon="el-icon-search"
          title="请先选择会议"
        >签到</el-button>
      </div>
      <!-- <el-button type="primary" size="small" icon="el-icon-edit">添加会议</el-button> -->
    </div>
    <div class="meetingTable">
      <el-table :data="signInListData.SignInTableList" max-height="450" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="mobilenumber" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="signintime" label="签到时间"></el-table-column>
        <!-- <el-table-column prop="sumNumber" label="会议时间"></el-table-column> -->
        <!-- <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEditMeeting(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              class="btnDelete"
              @click="handleDeleteMeeting(scope.row)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-pagination
        class="tablePagin"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="signInListData.meetingTablePage.page"
        :page-sizes="[10, 15, 25, 50]"
        :page-size="signInListData.meetingTablePage.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="signInListData.meetingTablePage.total"
      ></el-pagination>
    </div>
    <div class="dialogBox">
      <el-dialog
        :title="dialogMeetingSave.dialogTile"
        :visible.sync="dialogMeetingSave.dialogVisible"
        width="600px"
      >
        <div>
          <el-form
            :model="dialogMeetingSave.dialogFromData"
            :rules="dialogMeetingSave.dialogFromRules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="会议主题" prop="theme">
              <el-input v-model="dialogMeetingSave.dialogFromData.theme"></el-input>
            </el-form-item>
            <el-form-item label="会议地址" prop="address">
              <el-input v-model="dialogMeetingSave.dialogFromData.address"></el-input>
              <!-- <el-select v-model="ruleForm.address" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item label="会议时间" required>
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <!-- <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
                  <el-date-picker
                    type="datetime"
                    placeholder="会议开始时间"
                    v-model="dialogMeetingSave.dialogFromData.startTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker
                    type="datetime"
                    placeholder="会议结束时间"
                    v-model="dialogMeetingSave.dialogFromData.endTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="主讲人">
              <el-switch v-model="dialogMeetingSave.dialogFromData.delivery"></el-switch>
            </el-form-item>-->
            <el-form-item label="主讲人" prop="host">
              <el-input v-model="dialogMeetingSave.dialogFromData.host"></el-input>
            </el-form-item>
            <el-form-item label="主讲人介绍" prop="hostIntroduce">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="dialogMeetingSave.dialogFromData.hostIntroduce"
              ></el-input>
            </el-form-item>
            <el-form-item label="会议人数" prop="desc">
              <el-input v-model.number="dialogMeetingSave.dialogFromData.sumNumber"></el-input>
            </el-form-item>
            <el-form-item label="会议介绍" prop="desc">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="dialogMeetingSave.dialogFromData.contents"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogMeetingSave.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveMeeting">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="签到二维码" :visible.sync="dialogSignIn.visible" width="550px">
        <img class="signInImg" :src="dialogSignIn.signInImg" alt />
        <!-- <span>这是一段信息</span> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSignIn.visible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getSignInList,
  getMeetingList,
  setSngnInEdit,
  setSngnInDelete,
  setSngnInSave
} from "@/api/signInList/signInList.js";
export default {
  data() {
    return {
      isChoiceMeeting: true,
      state: "",
      timeout: null,
      signInListData: {
        meetingId: "",
        attended: 0,
        SignInTableList: [],
        meetingTablePage: {
          page: 0,
          size: 10,
          total: 0,
          theme: ""
        }
      },
      dialogSignIn: {
        visible: false,
        signInImg: ""
      },
      dialogMeetingSave: {
        dialogTile: "",
        dialogVisible: false,
        dialogFromData: {},
        dialogFromRules: {
          theme: [
            { required: true, message: "请输入会议主题", trigger: "blur" },
            { min: 3, message: "至少输入三个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入会议地址", trigger: "blur" }
          ],
          startTime: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          endTime: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          host: [{ required: true, message: "请输入主讲人", trigger: "blur" }],
          hostIntroduce: [
            { required: true, message: "请输入主讲人介绍", trigger: "blur" }
          ],
          sumNumber: [
            { required: true, message: "请输入会议人数", trigger: "blur" }
          ],
          contents: [
            { required: true, message: "请输入会议介绍", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          payCode: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ]
        }
      }
    };
  },
  mounted() {
    this.requestGetMeetingList();
    this.requestGetSignInList(this.signInListData.meetingTablePage);
  },
  methods: {
    /**
     * 关闭签到按钮
     */
    handleChoice() {
      this.isChoiceMeeting = true;
    },
    handleSignIn() {
      this.dialogSignIn.visible = true;
      this.dialogSignIn.signInImg =
        "/api/createQrcode?meetid=" + this.signInListData.attended;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.signInListData.meetingSelectList;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        console.log(state);
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      var params = {
        attended: item.id
      };
      this.signInListData.attended = item.id;
      this.isChoiceMeeting = false;
      this.requestGetSignInList(params);
    },
    /**
     * 搜索按钮
     */
    handleSearchMeeting() {
      this.requestGetSignInList(this.signInListData.meetingTablePage);
    },
    /**
     * 分页改变size
     */
    handleSizeChange(val) {
      this.signInListData.meetingTablePage.size = val;
      this.requestGetSignInList(this.signInListData.meetingTablePage);
    },
    /**
     * 分页改变page
     */
    handleCurrentChange(val) {
      this.signInListData.meetingTablePage.page = val - 1;
      this.requestGetSignInList(this.signInListData.meetingTablePage);
    },
    /**
     * 保存会议
     */
    handleSaveMeeting() {},
    /**
     * 删除会议
     */
    handleDeleteMeeting(row) {
      this.$confirm("该操作为删除会议, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    /**
     * 编辑会议
     */
    handleEditMeeting(row) {
      console.log(row);
      this.dialogMeetingSave.dialogTile = "编辑会议";
      this.dialogMeetingSave.dialogVisible = true;
      this.dialogMeetingSave.dialogFromData = JSON.parse(JSON.stringify(row));
    },
    /**
     * 请求会议列表
     */
    requestGetMeetingList(params) {
      getMeetingList(params).then(result => {
        this.signInListData.meetingSelectList = [];
        for (var i in result.content) {
          this.signInListData.meetingSelectList.push({
            value: result.content[i].theme,
            id: result.content[i].id
          });
        }
      });
    },
    /**
     * 获取签到列表
     */
    requestGetSignInList(params) {
      getSignInList(params).then(result => {
        this.signInListData.SignInTableList = result.content;
        this.signInListData.meetingTablePage.page = result.page;
        this.signInListData.meetingTablePage.size = result.size;
        this.signInListData.meetingTablePage.total = result.total;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#signInList {
  .searchBox {
    display: flex;
    justify-content: space-between;
    .searchInput {
      width: 200px;
    }
  }
  .meetingTable {
    .btnDelete {
      color: red;
    }
  }
  .dialogBox {
    .signInImg {
      width: 100%;
    }
    .line {
      text-align: center;
    }
  }
}
</style>