<template>
  <div class="home">
    <SearchForm @search="onSearch"/>
    <a-table :loading="loading" bordered :pagination="pagination" :dataSource="dataSource" :columns="columns" rowKey="keyword" :customRow="customRow" @change="change">
      <template #table="{ record }">
        {{record}}
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { Table as ATable } from 'ant-design-vue'
import { getTableList } from '@/apis/index' // 网络请求
import { ref, reactive } from 'vue'
import EchartTable from '@/components/table'
import SearchForm from './home/seearchForm.vue'

const dataSource = ref([])
const rankList = ref([])
const echartTitle = ref('')
const loading = ref(false)
let searchData = {} // 搜索数据缓存

const pagination = reactive({
  pageSizeOptions: ['5', '10', '20', '50', '100'],
  pageSize: 5,
  total: 0,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => {
    return `共 ${total} 条`
  }
})

const columns = [
  {
    title: '关键词',
    dataIndex: 'keyword',
    align: 'center',
    width: 200,
    key: 'keyword'
  },
  {
    title: '搜索热度',
    dataIndex: 'latest_s_v',
    align: 'center',
    width: 80,
    key: 'latest_s_v'
  },
  {
    title: '当前排名',
    dataIndex: 'latest_rank',
    align: 'center',
    width: 80,
    key: 'latest_rank'
  },
  {
    title: '肯定词',
    dataIndex: 'if_affirmed',
    align: 'center',
    width: 50,
    key: 'if_affirmed'
  },
  {
    title: '否定词',
    dataIndex: 'if_negative',
    align: 'center',
    width: 50,
    key: 'if_negative'
  },
  {
    title: '曝光量',
    dataIndex: 'expose',
    align: 'center',
    width: 50,
    key: 'expose'
  },
  {
    title: '点击数',
    dataIndex: 'clicks',
    align: 'center',
    width: 50,
    key: 'clicks'
  },
  {
    title: 'CTR',
    dataIndex: 'ctr',
    align: 'center',
    width: 50,
    key: 'ctr'
  },
  {
    title: 'CVR',
    dataIndex: 'cvr',
    align: 'center',
    width: 50,
    key: 'cvr'
  },
  {
    title: '广告ROI',
    dataIndex: 'roi',
    align: 'center',
    width: 50,
    key: 'roi'
  },
  {
    title: '广告组',
    dataIndex: 'ad_group',
    align: 'center',
    width: 200,
    key: 'ad_group'
  },
  {
    title: 'table',
    key: 'table',
    align: 'center',
    fixed: 'right',
    width: 500,
    customRender: ({ text, index }) => {
      const obj = {
        children: <div class="echartTable"><EchartTable rankList={rankList.value} title={echartTitle.value}/></div>,
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
const getData = () => {
  const { pageSize, current: page } = pagination
  const { keyword = '', asin = '' } = searchData
  const params = {
    pageSize: pageSize,
    page: page,
    asin,
    keyword
  }
  loading.value = true
  getTableList(params).then(res => {
    const { data, count } = res
    pagination.total = count
    dataSource.value = data
    setTimeout(() => {
      loading.value = false
    }, 500)
  }).catch(() => {
    loading.value = false
  })
}
const customRow = (record) => {
  return {
    onClick: (event) => {
      event.stopPropagation()
      rankList.value = record.rank_list
      echartTitle.value = record.keyword
    }
  }
}
const change = ({ pageSize, current }) => {
  pagination.current = current
  pagination.pageSize = pageSize
  getData()
}
const onSearch = (data) => {
  searchData = data
  pagination.current = 1
  getData()
}

</script>
<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    :global(.ant-spin-container) {
        border: 1px #ddd solid;
    }
    :global(.echartTable) {
       width: 100%;
       height: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 15px;
       border-radius: 5px;
    }
}
</style>
