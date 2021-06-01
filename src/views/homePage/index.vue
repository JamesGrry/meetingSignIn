<template>
  <div>
    <div style="width:100%;height:500px">
      <echarts-map></echarts-map>
    </div>
    <div style="width:100%;height:300px">
      <line-chart></line-chart>
    </div>
  </div>
</template>
<script>
import echartsMap from "@/components/echarts/distributionMap/map.vue";
import lineChart from "@/components/echarts/lineChart/index.vue";
export default {
  components: { echartsMap, lineChart },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="sass" scoped>

</style>