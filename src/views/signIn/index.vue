<template>
  <div id='signin'>
    <div class='meetingBox'>
      <el-autocomplete
        v-model='signInListData.meetingId'
        :fetch-suggestions='querySearchAsync'
        placeholder='选择会议'
        @select='handleSelect'
        size='small'
      ></el-autocomplete>
    </div>
    <div class='signInImage'>
      <!-- <img src='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' alt /> -->
      <el-image style :src='url' :preview-src-list='srcList'>
        <div slot='error' class='image-slot'>
          <i class='el-icon-picture-outline'></i>
          <span class='demonstration'>先选择签到的会议</span>
        </div>
      </el-image>
    </div>
  </div>
</template>
<script>
import { getMeetingList } from '@/api/signIn/signIn.js'
export default {
  data () {
    return {
      signInListData: {
        meetingId: '',
        attended: 0,
        meetingSelectList: [],
        meetingTablePage: {
          page: 0,
          size: 999,
          total: 0
        }
      },
      url: '',
      srcList: []
    }
  },
  mounted () {
    this.requestGetMeetingList(this.signInListData.meetingTablePage)
  },
  methods: {
    /**
     * 输入框搜索功能
     * @param queryString 搜索的内容
     * @param cb 搜索返回值处理方法
     */
    querySearchAsync (queryString, cb) {
      var restaurants = this.signInListData.meetingSelectList// 获取所有用来查询的数据
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants// 三元表达式判断是否输入了内容，若未输入返回所有的结果
      clearTimeout(this.timeout)// 防抖操作，防止页面卡死
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    /**
     * 通过传入会议ID获取二维码图片地址
     */
    handleSelect (item) {
      this.url = '/api/createQrcode?meetid=' + item.id
      this.srcList = []
      this.srcList = [this.url]
    },
    /**
     * 请求会议列表
     */
    requestGetMeetingList (params) {
      getMeetingList(params).then(result => {
        this.signInListData.meetingSelectList = []
        for (var i in result.content) {
          this.signInListData.meetingSelectList.push({
            value: result.content[i].theme,
            id: result.content[i].id
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#signin {
  .signInImage {
    width: 90%;
    padding: 5%;
    display: flex;
    justify-content: center;

    // img {
    //   width: 100%;
    // }
  }
}
</style>
