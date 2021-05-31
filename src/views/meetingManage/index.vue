<template>
  <div id="meetingManage">
    <div class="searchBox">
      <div>
        <el-input
          size="small"
          class="searchInput"
          v-model="meetingListData.meetingTablePage.theme"
          placeholder="请输入会议名称或地址"
        ></el-input>
        <el-button type="primary" size="small" @click="handleSearchMeeting" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="primary" size="small" @click="handleAddMeeting" icon="el-icon-edit">添加会议</el-button>
    </div>
    <div class="meetingTable">
      <el-table
        :data="meetingListData.meetingTableData"
        stripe
        style="width: 100%;"
        max-height="450"
      >
        <el-table-column prop="theme" label="会议名称" width="180"></el-table-column>
        <el-table-column prop="host" label="主讲人" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="sumnumber" label="参会人数"></el-table-column>
        <el-table-column prop="starttime" label="开始时间"></el-table-column>
        <el-table-column prop="endtime" label="结束时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              class="btnSuccess"
              @click="handleMesNotice(scope.row)"
              type="text"
              size="small"
            >短信通知</el-button>
            <el-button @click="handleEditMeeting(scope.row)" type="text" size="small">编辑</el-button>
            <el-popconfirm title="是否确认删除（签到人员也将一并删除）" @onConfirm="handleDeleteMeeting(scope.row)">
              <el-button class="btnDelete" slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="tablePagin"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 25, 50]"
        :page-size="meetingListData.meetingTablePage.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="meetingListData.meetingTablePage.total"
      ></el-pagination>
    </div>
    <div class="dialogBox">
      <el-drawer
        :title="dialogMeetingSave.dialogTile"
        :visible.sync="dialogMeetingSave.dialogVisible"
        direction="rtl"
        size="450px"
      >
        <div class="demo-drawer__content">
          <el-form
            :model="dialogMeetingSave.dialogFromData"
            :rules="dialogMeetingSave.dialogFromRules"
            ref="ruleForm"
            custom-class="demo-drawer"
            label-width="100px"
            class="demo-ruleForm"
            style="flex:1"
          >
            <el-form-item label="会议主题" prop="theme">
              <el-input v-model="dialogMeetingSave.dialogFromData.theme"></el-input>
            </el-form-item>
            <el-form-item label="会议地址" prop="address">
              <el-input v-model="dialogMeetingSave.dialogFromData.address"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="starttime">
              <el-date-picker
                type="datetime"
                placeholder="会议开始时间"
                v-model="dialogMeetingSave.dialogFromData.starttime"
                style="width: 100%;"
                value-format="yyyy/MM/dd HH:mm:ss"
                format="yyyy/MM/dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endtime">
              <el-date-picker
                type="datetime"
                placeholder="会议结束时间"
                v-model="dialogMeetingSave.dialogFromData.endtime"
                style="width: 100%;"
                value-format="yyyy/MM/dd HH:mm:ss"
                format="yyyy/MM/dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="主讲人" prop="host">
              <el-input v-model="dialogMeetingSave.dialogFromData.host"></el-input>
            </el-form-item>
            <el-form-item label="主讲人介绍" prop="hostintroduce">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                v-model="dialogMeetingSave.dialogFromData.hostintroduce"
              ></el-input>
            </el-form-item>
            <el-form-item label="会议人数" prop="sumnumber">
              <el-input v-model.number="dialogMeetingSave.dialogFromData.sumnumber"></el-input>
            </el-form-item>
            <el-form-item label="会议介绍" prop="contents">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                v-model="dialogMeetingSave.dialogFromData.contents"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="dialogMeetingSave.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveMeeting">确 定</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import {
  getMeetingList,
  setMeetingEdit,
  setMeetingDelete,
  setMeetingSave
} from "@/api/meetingManage/meetingManage.js";
import { swalSuccessInfo } from "@/assets/js/common.js";
export default {
  data() {
    return {
      meetingListData: {
        meetingTableData: [],
        meetingTablePage: {
          page: 0,
          size: 10,
          total: 0,
          theme: ""
        }
      },
      dialogMeetingSave: {
        dialogTile: "",
        dialogVisible: false,
        dialogFromData: {
          theme: "",
          address: "",
          starttime: "",
          endtime: "",
          host: "",
          hostintroduce: "",
          sumnumber: "",
          contents: ""
        },
        dialogFromRules: {
          theme: [
            { required: true, message: "请输入会议主题", trigger: "blur" },
            { min: 3, message: "至少输入三个字符", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入会议地址", trigger: "blur" }
          ],
          starttime: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          endtime: [
            {
              type: "date",
              required: true,
              message: "请选择日期",
              trigger: "change"
            }
          ],
          host: [{ required: true, message: "请输入主讲人", trigger: "blur" }],
          hostintroduce: [
            { required: true, message: "请输入主讲人介绍", trigger: "blur" }
          ],
          sumnumber: [
            { required: true, message: "请输入会议人数", trigger: "blur" }
          ],
          contents: [
            { required: true, message: "请输入会议介绍", trigger: "blur" }
          ]
          // payCode: [
          //   { required: true, message: "请输入活动名称", trigger: "blur" }
          // ]
        }
      }
    };
  },
  mounted() {
    this.requestGetMeetingList(this.meetingListData.meetingTablePage);
  },
  methods: {
    handleMesNotice() {
      this.$message("短信待接入！");
    },
    /**
     * 添加会议
     */
    handleAddMeeting() {
      // debugger;
      setTimeout(() => {
        this.resetFromData();
        this.dialogMeetingSave.dialogTile = "添加会议";
        this.dialogMeetingSave.dialogVisible = true;
        this.$refs.ruleForm.resetFields();
      }, 200);
    },
    /**
     * 搜索按钮
     */
    handleSearchMeeting() {
      this.meetingListData.meetingTablePage.page = 0;
      this.requestGetMeetingList(this.meetingListData.meetingTablePage);
    },
    /**
     * 分页改变size
     */
    handleSizeChange(val) {
      this.meetingListData.meetingTablePage.size = val;
      this.meetingListData.meetingTablePage.page = 0;

      this.requestGetMeetingList(this.meetingListData.meetingTablePage);
    },
    /**
     * 分页改变page
     */
    handleCurrentChange(val) {
      this.meetingListData.meetingTablePage.page = val - 1;
      this.requestGetMeetingList(this.meetingListData.meetingTablePage);
    },
    /**
     * 保存会议
     */
    handleSaveMeeting() {
      if (this.dialogMeetingSave.dialogFromData.id) {
        this.requestSetMeetingEdit(this.dialogMeetingSave.dialogFromData);
      } else {
        this.requestSetMeetingSave(this.dialogMeetingSave.dialogFromData);
      }
    },
    /**
     * 删除会议
     */
    handleDeleteMeeting(row) {
      var params = {
        id: row.id
      };
      this.requestSetMeetingDelete(params);
    },
    /**
     * 编辑会议
     */
    handleEditMeeting(row) {
      console.log(row);
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
      this.dialogMeetingSave.dialogTile = "编辑会议";
      this.dialogMeetingSave.dialogVisible = true;
      this.dialogMeetingSave.dialogFromData = JSON.parse(JSON.stringify(row));
      console.log(this.dialogMeetingSave.dialogFromData);
    },
    /**
     * 保存新增会议
     */
    requestSetMeetingSave(params) {
      setMeetingSave(params).then(result => {
        swalSuccessInfo("会议新增成功！");
        this.requestGetMeetingList(this.meetingListData.meetingTablePage);
        this.dialogMeetingSave.dialogVisible = false;
      });
    },
    /**
     * 请求删除会议
     */
    requestSetMeetingDelete(params) {
      setMeetingDelete(params).then(result => {
        swalSuccessInfo("删除成功！");
        this.requestGetMeetingList(this.meetingListData.meetingTablePage);
      });
    },
    /**
     * 请求编辑保存会议
     */
    requestSetMeetingEdit(params) {
      setMeetingEdit(params).then(result => {
        swalSuccessInfo("保存成功！");
        this.requestGetMeetingList(this.meetingListData.meetingTablePage);
        this.dialogMeetingSave.dialogVisible = false;
      });
    },
    /**
     * 请求会议列表
     */
    requestGetMeetingList(params) {
      getMeetingList(params).then(result => {
        this.meetingListData.meetingTableData = result.content;
        // this.meetingListData.meetingTablePage.page = result.page + 1;
        this.meetingListData.meetingTablePage.size = result.size;
        this.meetingListData.meetingTablePage.total = result.total;
      });
    },
    resetFromData() {
      this.dialogMeetingSave.dialogFromData = {
        theme: "",
        address: "",
        starttime: "",
        endtime: "",
        host: "",
        hostintroduce: "",
        sumnumber: "",
        contents: ""
      };
    }
  }
};
</script>
<style lang="scss" scoped>
#meetingManage {
  .searchBox {
    display: flex;
    justify-content: space-between;
    .searchInput {
      width: 200px;
    }
  }
  .meetingTable {
    p {
      text-align: center;
    }

    .btnSuccess {
      color: #67c23a;
    }

    .btnDelete {
      color: red;
    }
  }
  .dialogBox {
    .demo-drawer__content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0 20px 0 0;
      .demo-drawer__footer {
        display: flex;
        margin: 10px 0;
        padding: 0 10px;
        button {
          flex: 1;
        }
      }
    }
    .line {
      text-align: center;
    }
  }
}
</style>