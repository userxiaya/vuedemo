
<template>
  <div ref="echartRef" class="table">ds</div>
</template>
<script setup>
/* eslint-disable no-unused-vars */
import * as echarts from 'echarts'
import { onMounted, ref, defineProps, computed, watch } from 'vue'

const props = defineProps({
  rankList: {
    type: Array,
    default () {
      return []
    }
  },
  title: {
    type: String,
    default () {
      return 'title'
    }
  }
})
const echartRef = ref(null)
let myChart = null
onMounted(() => {
  if (echartRef.value) {
    myChart = echarts.init(echartRef.value)
  }
})
const Options = computed(() => {
  const { rankList, title } = props
  const xAxis = []
  const series = []
  rankList.forEach(e => {
    for (const key in e) {
      xAxis.push(key)
      series.push(e[key] || 0)
    }
  })

  const result = {
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xAxis
    },
    yAxis: {},
    series: [
      {
        name: 'index',
        type: 'line',
        data: series
      }
    ]
  }
  return result
})

watch(Options, (val, oldVal) => {
  if (myChart) {
    myChart.setOption(Options.value)
  }
})

</script>
<style lang="less" scoped>
.table {
    width:500px;
    height: 500px;
}
</style>
