<script setup lang="ts">
import { ref } from 'vue'
import type { SearchCategoryShow } from '@/types/SearchCategory'
import { getSearchCategory } from '@/service/user/SearchCategoryService'
import { searchCategoryToSearchCategoryShowArray } from '@/utils/Convert'
import { getSearch } from '@/service/user/SearchService'
import { Search as SearchIcon } from '@element-plus/icons-vue'
import type { Search } from '@/types/Search'
import { warning } from '@/utils/Message'
import i18n from '@/locales'

const { t } = i18n.global

const selectSearch = ref<Search>()
const list = ref<SearchCategoryShow[]>([])
const searchInput = ref<string>('')

const handleSelect = (key: string, keyPath: string[]) => {
  const [categoryId, searchId] = keyPath[1].split('-').map(Number)

  const category = list.value.find((searchCategory) => searchCategory.id === categoryId)
  if (category) {
    const search = category.search.find((search) => search.id === searchId)
    if (search) {
      selectSearch.value = search
    }
  }
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

const handleSearchButton = () => {
  if (searchInput.value.length === 0) {
    warning(t('home.empty_content'))
    return
  }

  if (selectSearch.value === undefined) {
    warning(t('home.not_selected'))
    return
  }

  window.open(`${selectSearch.value?.url}${searchInput.value}`)
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
      <input
        type="text"
        class="search-input"
        :placeholder="selectSearch?.name"
        v-model="searchInput"
      />
      <el-button circle :icon="SearchIcon" @click="handleSearchButton" />
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
