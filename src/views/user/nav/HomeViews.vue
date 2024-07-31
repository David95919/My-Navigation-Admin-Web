<script setup lang="ts">
import TimeDateCardComponent from '@/components/user/TimeDateCardComponent.vue'
import SearchComponent from '@/components/user/SearchComponent.vue'
import NavComponent from '@/components/user/NavComponent.vue'
import SettingsDialogComponent from '@/components/admin/SettingsDialogComponent.vue'
import { ref } from 'vue'

const settingsDialog = ref<InstanceType<typeof SettingsDialogComponent> | null>(null)

const handleOpenSettings = () => {
  settingsDialog.value?.open()
}
</script>
<template>
  <div class="home">
    <div class="top">
      <TimeDateCardComponent></TimeDateCardComponent>
    </div>
    <div class="search">
      <SearchComponent></SearchComponent>
    </div>
    <div class="nav">
      <NavComponent></NavComponent>
    </div>
    <el-button circle class="settings" @click="handleOpenSettings">
      <el-icon>
        <i-material-symbols-settings />
      </el-icon>
    </el-button>
    <SettingsDialogComponent ref="settingsDialog"></SettingsDialogComponent>
  </div>
</template>
<style scoped lang="less">
.home {
  position: relative;

  width: 100vw;
  height: 100vh;

  .top {
    padding: 25px 0;
  }

  .search {
    margin: 0 auto;
  }

  .nav {
    margin: 10px auto 0;
    width: 85vw;
  }

  .settings {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
