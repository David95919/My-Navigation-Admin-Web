<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>
<template>
  <el-card class="search" body-class="search-card-body">
    <input type="text" class="search-input" />
    <el-button :icon="Search" circle></el-button>
  </el-card>
</template>
<style scoped lang="less">
.search {
  --el-card-border-radius: 80px;
  width: 45vw;
  height: 40px;

  :deep(.search-card-body) {
    display: flex;
    padding: 5px 10px 5px 10px;
  }

  .search-input {
    width: 100%;
    font-size: 1.4em;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>
