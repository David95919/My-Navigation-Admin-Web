<script setup lang="ts">
import DialogComponent from '@/components/admin/DialogComponent.vue'
import { ref } from 'vue'
import { createSearch, getSearchById, updateSearch } from '@/service/admin/SearchService'
import { SearchFormRule } from '@/utils/Rules'
import type { SearchDTO } from '@/types/Search'
import SearchCategorySelect from '@/components/admin/searchCategory/SearchCategorySelect.vue'

const emits = defineEmits<{
  confirm: []
}>()

const dialogVisible = ref(false)
const isAdd = ref(true)
const form = ref<SearchDTO>({ id: 0, name: '', url: '', categoryId: null })

const open = async (id?: number) => {
  dialogVisible.value = true

  //判断模式
  isAdd.value = id === undefined
  form.value = { id: 0, name: '', url: '', categoryId: null }

  if (id != undefined) {
    form.value.id = id
    const search = await getSearchById(id)
    form.value = {
      id: search.id,
      name: search.name,
      url: search.url,
      categoryId: search.searchCategory.id
    }
  }
}

const confirm = async () => {
  let result = false

  if (isAdd.value) {
    result = await createSearch(form.value)
  } else {
    result = await updateSearch(form.value)
  }

  if (result) {
    dialogVisible.value = false
    emits('confirm')
  }
}

defineExpose({
  open
})
</script>
<template>
  <DialogComponent
    v-model:visible="dialogVisible"
    :title="isAdd ? $t('other.add') : $t('other.edit')"
    @confirm="confirm"
  >
    <el-form :model="form" :rules="SearchFormRule">
      <el-form-item :label="$t('other.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('search.url')" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.category')" prop="categoryId">
        <SearchCategorySelect v-model="form.categoryId" width="100%"></SearchCategorySelect>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
