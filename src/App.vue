<template>
    <ConfigProvider :locale="zhCN">
      <router-view/>
    </ConfigProvider>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'moment/dist/locale/zh-cn'
</script>
<style lang="scss">
html,body,#app {
  width: 100%;
  height: 100%;
}
</style>
