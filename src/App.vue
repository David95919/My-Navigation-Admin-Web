<script setup lang="ts">
import { RouterView } from 'vue-router'
import { settingsStore } from '@/stores/settingsStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'

const { isGlass, background,blurLevel } = storeToRefs(settingsStore())
const isDark = ref(useDark())
const containerBackground = ref(`url(${background.value})`)
</script>
<template>
  <router-view></router-view>
</template>
<style lang="less">
@color: v-bind("isGlass ? 'rgb(0, 0, 0)' : ''");

:root {
  --el-menu-bg-color: @color !important;
  --el-bg-color: @color !important;
  --el-fill-color-blank: @color !important;
  --el-color-danger-light-9: @color !important;
  --el-color-primary-light-9: @color !important;
}
</style>

<style>
.el-dialog,
.el-card {
  background-color: v-bind(
    "isGlass ? 'rgba(0, 0, 0, 0.2)' : isDark? '#1d1e1f' : '#ffffff'"
  ) !important;
  backdrop-filter: v-bind("isGlass ? `blur(${blurLevel}px)` : isDark? '#1d1e1f' : '#ffffff'") !important;
}

.el-container {
  background-image: v-bind(containerBackground);
  background-size: 100% 100%;
}
</style>
