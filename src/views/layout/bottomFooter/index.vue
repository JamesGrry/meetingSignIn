<template>
  <div id="footer" style="text-align: center; color: #999999; font-size: 14px">
    <p>Copyright {{ dayYear }}詹伊栋.AllRightsReserved 联系方式：17316558378</p>
    <p>
      @www.grry.top Mr.Zhan
      <a style="color: #999999" href="http://beian.miit.gov.cn/" target="_blank"
        >浙ICP备20016204号-1</a
      >
      毕业设计仅作为学习交流
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayYear: new Date().getFullYear()
    };
  }
};
</script>
<style lang="scss" scoped>
</style>