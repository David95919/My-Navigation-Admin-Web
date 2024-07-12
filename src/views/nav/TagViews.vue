<script setup lang="ts">
import {computed, ref} from "vue";
import {getTag, deleteTagById} from "@/service/TagService";
import type {Tag} from "@/types/Tag";

const tagList = ref<Tag[]>([]);
const filterTableData = computed(() =>
    tagList.value.filter((data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const search = ref('')

const handleGetTag = async () => {
  tagList.value = await getTag()
}

const handleDelete = async (id: number) => {
  await deleteTagById(id);
  handleGetTag()
}

const handleEdit = (id: number) => {
  console.log(id)
}
handleGetTag()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="title">{{ $t('manage.tag') }}</div>
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
            <el-button disabled plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }}</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)">{{
                $t('other.delete')
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
</template>
<style scoped>
.card {
  .title {
    font-size: 1.25em;
  }
}
</style>
