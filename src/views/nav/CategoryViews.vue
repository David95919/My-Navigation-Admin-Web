<script setup lang="ts">
import { computed, ref } from 'vue'
import { deleteCategoryById, getCategory, multipleDeleteCategory } from '@/service/CategoryService'
import type { Category } from '@/types/Category'
import CategoryDialogComponent from '@/components/category/CategoryDialogComponent.vue'

const categoryDialog = ref<InstanceType<typeof CategoryDialogComponent> | null>(null)
const search = ref('')
const multipleSelection = ref<Category[]>([])
const categoryList = ref<Category[]>([])
const filterTableData = computed(() =>
  categoryList.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleGetCategory = async () => {
  categoryList.value = await getCategory()
}

const handleDelete = async (id: number) => {
  await deleteCategoryById(id)
  handleGetCategory()
}

const handleMultipleDelete = async () => {
  await multipleDeleteCategory(multipleSelection.value)
  handleGetCategory()
}

const handleEdit = (id: number) => {
  categoryDialog.value?.open(id)
}

const handleAdd = () => {
  categoryDialog.value?.open()
}

const handleSelectionChange = (value: Category[]) => {
  multipleSelection.value = value
}

handleGetCategory()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.category') }}</div>
        <div>
          <el-button plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button type="danger" plain @click="handleMultipleDelete">{{
            $t('other.delete')
          }}</el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table :data="filterTableData" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="name" :label="$t('other.name')" />
        <el-table-column label="Operations">
          <template #header>
            <el-input v-model="search" size="small" :placeholder="$t('other.search')" />
          </template>
          <template #default="scope">
            <el-button plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }}</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)">{{
              $t('other.delete')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
  <CategoryDialogComponent
    ref="categoryDialog"
    @confirm="handleGetCategory"
  ></CategoryDialogComponent>
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
