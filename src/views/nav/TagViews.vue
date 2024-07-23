<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTag, deleteTagById, multipleDeleteTag } from '@/service/TagService'
import type { Tag } from '@/types/Tag'
import TagDialogComponent from '@/components/tag/TagDialogComponent.vue'

const tagDialog = ref<InstanceType<typeof TagDialogComponent> | null>(null)
const search = ref('')
const multipleSelection = ref<Tag[]>([])
const tagList = ref<Tag[]>([])
const filterTableData = computed(() =>
  tagList.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleGetTag = async () => {
  tagList.value = await getTag()
}

const handleDelete = async (id: number) => {
  await deleteTagById(id)
  handleGetTag()
}

const handleMultipleDelete = async () => {
  await multipleDeleteTag(multipleSelection.value)
  handleGetTag()
}

const handleEdit = (id: number) => {
  tagDialog.value?.open(id)
}

const handleAdd = () => {
  tagDialog.value?.open()
}

const handleSelectionChange = (value: Tag[]) => {
  multipleSelection.value = value
}

handleGetTag()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.tag') }}</div>
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
  <TagDialogComponent ref="tagDialog" @confirm="handleGetTag"></TagDialogComponent>
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
