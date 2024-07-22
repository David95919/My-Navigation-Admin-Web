<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent.vue'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { settingsStore } from '@/stores/settingsStore'
import i18n from '@/locales'
import { useUserStore } from '@/stores/userStore'

const { isGlass, background, blurLevel } = storeToRefs(settingsStore())
const { signOut } = useUserStore()

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
      <el-form-item :label="$t('other.other')">
        <el-button @click="signOut">{{ $t('settings.sign_out') }}</el-button>
        <el-popover hide-after="650" trigger="hover" placement="top" :width="300">
          <template #reference>
            <el-button>{{ $t('settings.about') }}</el-button>
          </template>
          <template #default>
            <p>
              {{ $t('settings.author') }}
              <el-link href="https://github.com/David95919" target="_blank">David95919</el-link>
            </p>
            <el-link href="https://github.com/David95919/My-Navigation-Admin" target="_blank"
              >My-Navigation-Admin
            </el-link>
            <el-link href="https://github.com/David95919/My-Navigation-Admin-Web" target="_blank">
              My-Navigation-Admin-Web
            </el-link>
          </template>
        </el-popover>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
