<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent.vue'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { settingsStore } from '@/stores/settingsStore'
import i18n from '@/locales'

const { isGlass, background, blurLevel } = storeToRefs(settingsStore())

const isDark = ref(useDark())
const dialogVisible = ref(false)

const confirm = async () => {
  dialogVisible.value = false
}

const open = async () => {
  dialogVisible.value = true
}

const handleSelectLanguage = (l: any) => {
  console.log(l)
  localStorage.setItem('language', l)
  i18n.global.locale = l
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
      <el-form-item :label="$t('settings.background_image')">
        <el-input v-model="background" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('settings.blur_level')">
        <el-slider :disabled="!isGlass" v-model="blurLevel" :show-tooltip="false" />
      </el-form-item>
      <el-form-item :label="$t('settings.language')">
        <el-select v-model="i18n.global.locale" @change="handleSelectLanguage">
          <el-option
            v-for="l in i18n.global.messages"
            :key="l.language"
            :value="l.language"
            :label="l.language"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
