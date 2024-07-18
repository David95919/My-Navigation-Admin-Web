<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent.vue'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { settingsStore } from '@/stores/settingsStore'

const { isGlass } = storeToRefs(settingsStore())

const isDark = ref(useDark())
const dialogVisible = ref(false)

const confirm = async () => {
  dialogVisible.value = false
}

const open = async () => {
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>
<template>
  <DialogComponent
    :title="$t('manage.settings')"
    v-model:visible="dialogVisible"
    @confirm="confirm"
  >
    <el-form>
      <el-form-item :label="$t('settings.dark')">
        <el-switch v-model="isDark">
          <template #active-action>
            <i-material-symbols-dark-mode-outline-rounded />
          </template>
        </el-switch>
      </el-form-item>
      <el-form-item :label="$t('settings.glass')">
        <el-switch v-model="isGlass"></el-switch>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
