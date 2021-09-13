
<template>
  <div class="home">
    <Table :dataSource="dataSource" :columns="columns" rowKey="keyword" :customRow="customRow">
      <template #table="{ record }">
        {{record}}
      </template>
    </Table>
  </div>
</template>

<script setup>
import { Table } from 'ant-design-vue'
import { getTableList } from '@/apis/index' // 网络请求
import { ref } from 'vue'
import EchartTable from '@/components/table'

const dataSource = ref([])
const rankList = ref([])
const echartTitle = ref('')
const columns = [
  {
    title: '关键词',
    dataIndex: 'keyword',
    key: 'keyword'
  },
  {
    title: '搜索量',
    dataIndex: 'latest_s_v',
    key: 'latest_s_v'
  },
  {
    title: '当前排名',
    dataIndex: 'latest_rank',
    key: 'latest_rank'
  },
  {
    title: '排名变化',
    dataIndex: 'latest_rank',
    key: 'latest_rank'
  },
  {
    title: 'table',
    key: 'table',
    width: 500,
    customRender: ({ text, index }) => {
      const obj = {
        children: <EchartTable rankList={rankList.value} title={echartTitle.value}/>,
        props: {}
      }

      if (index === 0) {
        obj.props.rowSpan = 10
      } else {
        obj.props.rowSpan = 0
      }

      return obj
    }
  }
]
getTableList().then(data => {
  dataSource.value = data
})
const customRow = (record) => {
  return {
    onClick: (event) => {
      event.stopPropagation()
      rankList.value = record.rank_list
      echartTitle.value = record.keyword
    }
  }
}

</script>
<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
}
</style>
