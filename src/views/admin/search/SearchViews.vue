<script setup lang="ts">
import { computed, ref } from 'vue'

import SearchDialogComponent from '@/components/admin/search/SearchDialogComponent.vue'
import type { Search } from '@/types/Search'
import { deleteSearch, getSearch } from '@/service/admin/SearchService'

const searchDialog = ref<InstanceType<typeof SearchDialogComponent> | null>(null)
const search = ref('')
const multipleSelection = ref<Search[]>([])
const searchList = ref<Search[]>([])
const filterTableData = computed(() =>
  searchList.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleGetSearch = async () => {
  searchList.value = await getSearch({ searchCategoryId: null })
}

const handleDelete = async (id: number) => {
  await deleteSearch(id)
  handleGetSearch()
}

const handleMultipleDelete = async () => {
  handleGetSearch()
}

const handleEdit = (id: number) => {
  searchDialog.value?.open(id)
}

const handleAdd = () => {
  searchDialog.value?.open()
}

const handleSelectionChange = (value: Search[]) => {
  multipleSelection.value = value
}

handleGetSearch()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.search') }}</div>
        <div>
          <el-button plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button type="danger" plain @click="handleMultipleDelete"
            >{{ $t('other.delete') }}
          </el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table :data="filterTableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="name" :label="$t('other.name')" />
        <el-table-column class="url" prop="url" :label="$t('search.url')" />
        <el-table-column prop="searchCategory" :label="$t('search.searchCategory')">
          <template #default="scope">
            {{ scope.row.searchCategory.name }}
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #header>
            <el-input v-model="search" size="small" :placeholder="$t('other.search')" />
          </template>
          <template #default="scope">
            <el-button plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }}</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)"
              >{{ $t('other.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
  <SearchDialogComponent ref="searchDialog" @confirm="handleGetSearch"></SearchDialogComponent>
</template>
<style scoped>
.card {
  .title {
    font-size: 1.25em;
  }
}

.header {
  display: flex;
  justify-content: space-between;
}

.url {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
