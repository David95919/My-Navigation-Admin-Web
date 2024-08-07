<script setup lang="ts">
import { useRoute } from 'vue-router'
import SettingsDialogComponent from '@/components/SettingsDialogComponent.vue'
import { ref } from 'vue'

const route = useRoute()
const settingsDialog = ref<InstanceType<typeof SettingsDialogComponent> | null>(null)

const handleOpenSettings = () => {
  settingsDialog.value?.open()
}
</script>
<template>
  <el-container class="common-layout">
    <el-card class="aside-card" shadow="always">
      <el-aside class="aside" style="width: auto">
        <el-menu
          class="menu"
          :default-active="route.path"
          :default-openeds="['navigation', 'search']"
          router
          collapse-transition
        >
          <el-menu-item index="/admin/home">
            <el-icon>
              <i-material-symbols-home-outline-rounded />
            </el-icon>
            <span>{{ $t('manage.home') }}</span>
          </el-menu-item>
          <el-sub-menu index="navigation">
            <template #title>
              <el-icon>
                <i-material-symbols-assistant-navigation-outline-rounded />
              </el-icon>
              <span>{{ $t('manage.navigation') }}</span>
            </template>
            <el-menu-item index="/admin/navigation">
              <el-icon>
                <i-material-symbols-assistant-navigation-outline-rounded />
              </el-icon>
              <span>{{ $t('manage.navigation') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/category">
              <el-icon>
                <i-material-symbols-category-outline-rounded />
              </el-icon>
              <span>{{ $t('manage.category') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/tag">
              <el-icon>
                <i-material-symbols-tag-rounded />
              </el-icon>
              <span>{{ $t('manage.tag') }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="search">
            <template #title>
              <el-icon>
                <i-material-symbols-search-rounded />
              </el-icon>
              <span>{{ $t('manage.search') }}</span>
            </template>
            <el-menu-item index="/admin/search">
              <el-icon>
                <i-material-symbols-search-rounded />
              </el-icon>
              <span>{{ $t('manage.search') }}</span>
            </el-menu-item>
            <el-menu-item index="/admin/searchCategory">
              <el-icon>
                <i-material-symbols-category-outline-rounded />
              </el-icon>
              <span>{{ $t('manage.searchCategory') }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/admin/user">
            <el-icon>
              <i-material-symbols-user-attributes-outline-rounded />
            </el-icon>
            <span>{{ $t('manage.user') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-card>
    <div class="container">
      <el-card class="header" shadow="always">
        <div class="title">My-Navigation-Admin</div>
        <el-button circle class="settings" @click="handleOpenSettings">
          <el-icon>
            <i-material-symbols-settings />
          </el-icon>
        </el-button>
      </el-card>
      <div class="main">
        <el-scrollbar height="89vh">
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
    <SettingsDialogComponent ref="settingsDialog"></SettingsDialogComponent>
  </el-container>
</template>
<style scoped lang="less">
.common-layout {
  width: 100vw;
  height: 100vh;

  .aside-card {
    width: 12vw;
    max-width: 12vw;
    min-width: 130px;
    margin: 10px 0 10px 10px;

    .aside {
      width: 12vw;

      .el-menu {
        border-right: 0;
      }
    }
  }

  .container {
    width: 100%;

    .header {
      position: relative;
      margin: 10px;

      .title {
        font-size: 1.25em;
        text-align: center;
      }

      .settings {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }

    .main {
      margin: 10px;
    }
  }
}
</style>
