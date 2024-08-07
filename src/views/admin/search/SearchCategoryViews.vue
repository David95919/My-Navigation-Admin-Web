<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchCategoryDialogComponent from '@/components/admin/searchCategory/SearchCategoryDialogComponent.vue'
import { deleteSearchCategory, getSearchCategory } from '@/service/admin/SearchCategoryService'
import type { SearchCategory } from '@/types/SearchCategory'

const searchCategoryDialog = ref<InstanceType<typeof SearchCategoryDialogComponent> | null>(null)
const search = ref('')
const multipleSelection = ref<SearchCategory[]>([])
const searchCategoryList = ref<SearchCategory[]>([])
const filterTableData = computed(() =>
  searchCategoryList.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleGetSearchCategory = async () => {
  searchCategoryList.value = await getSearchCategory()
}

const handleDelete = async (id: number) => {
  await deleteSearchCategory(id)
  handleGetSearchCategory()
}

const handleMultipleDelete = async () => {
  console.log(multipleSelection.value)
  handleGetSearchCategory()
}

const handleEdit = (id: number) => {
  searchCategoryDialog.value?.open(id)
}

const handleAdd = () => {
  searchCategoryDialog.value?.open()
}

const handleSelectionChange = (value: SearchCategory[]) => {
  multipleSelection.value = value
}

handleGetSearchCategory()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.searchCategory') }}</div>
        <div>
          <el-button plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button type="danger" plain @click="handleMultipleDelete" disabled
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
  <SearchCategoryDialogComponent
    ref="searchCategoryDialog"
    @confirm="handleGetSearchCategory"
  ></SearchCategoryDialogComponent>
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
</style>
