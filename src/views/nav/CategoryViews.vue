<script setup lang="ts">
import {computed, ref} from "vue";
import {getCategory} from "@/service/CategoryService";
import type {Category} from "@/types/Category";

const categoryList = ref<Category[]>([]);
const filterTableData = computed(() =>
    categoryList.value.filter((data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const search = ref('')

const handleGetCategory = async () => {
  categoryList.value = await getCategory()
}

const handleDelete = (id: number) => {
  console.log(id)
}

const handleEdit = (id: number) => {
  console.log(id)
}
handleGetCategory()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="title">{{ $t('manage.category') }}</div>
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
            <el-button disabled type="danger" plain @click="handleDelete(scope.row.id)">{{
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
