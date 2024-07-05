<script setup lang="ts">
import {Moon, Sunny} from '@element-plus/icons-vue'
import {useDark, useToggle} from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <el-switch
      v-model="isDark"
      inline-prompt
      active-text="dark"
      :active-action-icon="Moon"
      size="large"
      inactive-text="light"
      :inactive-action-icon="Sunny"
      @change="toggleDark"
  />
</template>
<style scoped>
</style>
