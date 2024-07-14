<script setup lang="ts">
import {computed, ref} from "vue";
import {getTag, deleteTagById} from "@/service/TagService";
import type {Tag} from "@/types/Tag";
import TagDialogComponent from "@/components/tag/TagDialogComponent.vue";

const tagDialog = ref<InstanceType<typeof TagDialogComponent> | null>(null)
const search = ref('')
const tagList = ref<Tag[]>([]);
const filterTableData = computed(() =>
    tagList.value.filter((data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)

const handleGetTag = async () => {
  tagList.value = await getTag()
}

const handleDelete = async (id: number) => {
  await deleteTagById(id);
  handleGetTag()
}

const handleEdit = (id: number) => {
  tagDialog.value?.open(id)
}

const handleAdd = () => {
  tagDialog.value?.open()
}

handleGetTag()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.tag') }}</div>
        <div>
          <el-button plain @click="handleAdd">Add</el-button>
          <el-button type="danger" plain>Delete</el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table :data="filterTableData" border>
        <el-table-column prop="id" label="Id"/>
        <el-table-column prop="name" :label="$t('other.name')"/>
        <el-table-column label="Operations">
          <template #header>
            <el-input v-model="search" size="small" :placeholder="$t('other.search')"/>
          </template>
          <template #default="scope">
            <el-button plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }}</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)">{{
                $t('other.delete')
              }}
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
