<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { SearchCategoryShow } from '@/types/SearchCategory'
import { getSearchCategory } from '@/service/user/SearchCategoryService'
import { searchCategoryToSearchCategoryShowArray } from '@/utils/Convert'
import { getSearch } from '@/service/user/SearchService'

const list = ref<SearchCategoryShow[]>([])

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleOpen = async (key: string) => {
  for (const item of list.value) {
    if (item.id === Number(key) && item.search.length === 0) {
      item.search = await getSearch({ searchCategoryId: Number(key) })
    }
  }
}

const handleSearchCategoryList = async () => {
  list.value = searchCategoryToSearchCategoryShowArray(await getSearchCategory())
}

handleSearchCategoryList()
</script>
<template>
  <div class="search">
    <el-menu
      mode="horizontal"
      @select="handleSelect"
      @open="handleOpen"
      :ellipsis="false"
      class="search-select"
    >
      <el-sub-menu v-for="category in list" :key="category.id" :index="`${category.id}`">
        <template #title>{{ category.name }}</template>
        <el-menu-item
          v-for="search in category.search"
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
