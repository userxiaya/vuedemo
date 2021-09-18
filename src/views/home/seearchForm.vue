
<template>
  <a-form layout="inline" class="searchForm">
    <a-form-item label="关键词" v-bind="validateInfos.keyword">
      <a-input v-model:value="formState.keyword" placeholder="请输入关键词"/>
    </a-form-item>

    <a-form-item label="ASIN" v-bind="validateInfos.asin">
      <a-input v-model:value="formState.asin" placeholder="ASIN" />
    </a-form-item>
    <a-form-item label="搜索方式" v-bind="validateInfos.checkType" >
        <a-select allowClear v-model:value="formState.checkType" style="width: 180px" placeholder="请选择搜索方式">
            <a-select-option v-for="item in searchTypeOpt" v-once :key="item.value" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click.prevent="onSubmit">搜索</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw, defineEmits } from 'vue'
import { Form as AForm, Input as AInput, Button as AButton, Select as ASelect } from 'ant-design-vue'

const searchTypeOpt = [
  { value: '1', label: '搜索全部' },
  { value: '2', label: '只搜肯定词' },
  { value: '3', label: '不搜否定词' },
  { value: '4', label: '广告投放中的词' },
  { value: '5', label: '较上期新增的词' }
]
const { Option: ASelectOption } = ASelect
const emit = defineEmits(['search'])
const AFormItem = AForm.Item
const useForm = AForm.useForm
const formState = reactive({
  keyword: '',
  asin: '',
  checkType: undefined
})
const rulesRef = reactive({
  keyword: [],
  asin: [{
    required: true,
    whitespace: true,
    message: 'Please input asin'
  }],
  checkType: []
})
const { resetFields, validate, validateInfos } = useForm(formState, rulesRef)

const onSubmit = () => {
  validate().then(() => {
    emit('search', toRaw(formState))
  }).catch(err => {
    console.log('error', err)
  })
}
</script>
<style lang="less" scoped>
.searchForm {
    padding: 20px;
    border: 1px #ddd solid;
    border-radius: 8px;
    margin-bottom: 30px;
}
</style>
