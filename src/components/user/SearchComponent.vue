<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const mockData = ref([
  { id: 1, name: '搜索' },
  { id: 2, name: '工具' },
  { id: 3, name: '社交' }
])

const mockDataList = ref([
  { id: 1, name: 'GoogleSearch', url: 'https://www.google.com/search?q=' },
  { id: 2, name: 'BingSearch', url: 'https://www.bing.com/search?q=' },
  { id: 3, name: 'SearChenCryptSearch', url: 'https://www.searchencrypt.com/search/?q=' },
  { id: 4, name: 'DuckDuckSearch', url: 'https://duckduckgo.com/?q=' }
])

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<template>
  <div class="search">
    <el-menu mode="horizontal" @select="handleSelect" :ellipsis="false" class="search-select">
      <el-sub-menu v-for="category in mockData" :key="category.id" :index="`${category.id}`">
        <template #title>{{ category.name }}</template>
        <el-menu-item
          v-for="search in mockDataList"
          :key="search.id"
          :index="`${category.id}-${search.id}`"
        >
          {{ search.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-card class="search-body" body-class="search-card-body">
      <input type="text" class="search-input" />
      <el-button circle :icon="Search" />
    </el-card>
  </div>
</template>
<style scoped lang="less">
.search {
  display: flex;
  flex-direction: column;
}

:deep(.search-select) {
  margin: 0 auto;
  border-bottom: 0;
  height: 4vh;
}

.search-body {
  margin: 0 auto;
  display: grid;
  align-content: center;
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
