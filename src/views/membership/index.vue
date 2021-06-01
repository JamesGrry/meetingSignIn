<template>
  <div id='membership'>
    <div class='searchBox'>
      <div>
        <el-autocomplete
          v-model='signInListData.meetingId'
          :fetch-suggestions='querySearchAsync'
          placeholder='选择会议'
          @select='handleSelect'
          size='small'
        ></el-autocomplete>
      </div>
    </div>
    <div class='demo-image__preview'>
      <el-image class='codeImage' :src='signInCode.imgSrc' :preview-src-list='signInCode.srcList'></el-image>
    </div>
  </div>
</template>
<script>
import { getMeetingList } from '@/api/membership/membership.js'
import img from '@/assets/images/1577954390.jpg'
export default {
  data () {
    return {
      signInListData: {
        meetingId: '',
        meetingSelectList: [],
        meetingTablePage: {
          page: 0,
          size: 999,
          total: 0
        }
      },
      signInCode: {
        imgSrc: img,
        srcList: ['@/api/assets/images/1577954390.jpg']
      }
    }
  },
  mounted () {
    this.requestGetMeetingList(this.signInListData.meetingTablePage)
  },
  methods: {
    querySearchAsync (queryString, cb) {
      var restaurants = this.signInListData.meetingSelectList
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
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
    handleSelect (item) {
      console.log(item)
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
#membership {
  height: calc(100% - 72px);
  .demo-image__preview {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .codeImage {
      width: 500px;
    }
  }
}
</style>
