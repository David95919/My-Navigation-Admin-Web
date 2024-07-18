<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <el-container class="common-layout">
    <el-card class="aside-card" shadow="always">
      <el-aside class="aside">
        <el-menu class="menu" :default-active="route.path" router collapse-transition>
          <el-menu-item index="/home">
            <el-icon>
              <i-material-symbols-home-outline-rounded />
            </el-icon>
            <span>{{ $t('manage.home') }}</span>
          </el-menu-item>
          <el-menu-item index="/navigation">
            <el-icon>
              <i-material-symbols-assistant-navigation-outline-rounded />
            </el-icon>
            <span>{{ $t('manage.navigation') }}</span>
          </el-menu-item>
          <el-menu-item index="/category">
            <el-icon>
              <i-material-symbols-category-outline-rounded />
            </el-icon>
            <span>{{ $t('manage.category') }}</span>
          </el-menu-item>
          <el-menu-item index="/tag">
            <el-icon>
              <i-material-symbols-tag-rounded />
            </el-icon>
            <span>{{ $t('manage.tag') }}</span>
          </el-menu-item>
          <el-menu-item index="/user">
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
      </el-card>
      <div class="main">
        <el-scrollbar height="89vh">
          <router-view></router-view>
        </el-scrollbar>
      </div>
    </div>
  </el-container>
</template>
<style scoped lang="less">
.common-layout {
  width: 100vw;
  height: 100vh;

  .aside-card {
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
      margin: 10px;

      .title {
        font-size: 1.25em;
        text-align: center;
      }
    }

    .main {
      margin: 10px;
    }
  }
}
</style>
