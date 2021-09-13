
<template>
  <a-form layout="inline" class="searchForm">
    <a-form-item label="关键词" v-bind="validateInfos.keyword">
      <a-input v-model:value="formState.keyword" />
    </a-form-item>

    <a-form-item label="ASIN" v-bind="validateInfos.asin">
      <a-input v-model:value="formState.asin" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click.prevent="onSubmit">搜索</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw, defineEmits } from 'vue'
import { Form as AForm, Input as AInput, Button as AButton } from 'ant-design-vue'

const emit = defineEmits(['search'])
const AFormItem = AForm.Item
const useForm = AForm.useForm
const formState = reactive({
  keyword: '',
  asin: ''
})
const rulesRef = reactive({
  keyword: [],
  asin: [{
    required: true,
    whitespace: true,
    message: 'Please input asin'
  }]
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
