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
  <div class="wrapper">
    <el-card class="header">
      <div class="title">My-Navigation-Admin</div>
      <el-button circle class="settings" @click="handleOpenSettings">
        <el-icon>
          <i-material-symbols-settings />
        </el-icon>
      </el-button>
    </el-card>
    <el-menu
      class="sidebar"
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
    <div class="content">
      <router-view></router-view>
    </div>
    <SettingsDialogComponent ref="settingsDialog"></SettingsDialogComponent>
  </div>
</template>
<style scoped lang="less">
.wrapper {
  display: grid;
  min-height: 100vh;

  /* 使用 minmax 来确保 sidebar 有一个最小宽度，内容区域填充剩余空间 */
  grid-template-columns: minmax(200px, auto) 1fr;
  grid-template-rows: auto 1fr;

  grid-template-areas:
    'sidebar header'
    'sidebar content';

  overflow: hidden; /* 避免滚动条 */
}

.header {
  position: relative;
  grid-area: header;
  width: 100%; /* 确保 header 的宽度自适应 */

  .settings {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.sidebar {
  grid-area: sidebar;
  max-width: 100%; /* 确保 sidebar 不会超出容器宽度 */
}

.content {
  grid-area: content;
  overflow: auto; /* 允许内容区域在必要时滚动 */
  min-width: 0; /* 允许内容区域在必要时缩小 */
}

.header,
.sidebar,
.content {
  margin: 5px;
}
</style>
