<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import { settingsStore } from '@/stores/settingsStore'
import { storeToRefs } from 'pinia'

const { isGlass } = storeToRefs(settingsStore())

const glass = (value: boolean) => {
  if (value) {
    // 动态导入 CSS 文件
    import('./assets/glass-effect.css').then(() => {})
  }
}

watch(isGlass, glass)

glass(isGlass.value)
</script>
<template>
  <router-view></router-view>
</template>
<style scoped></style>
