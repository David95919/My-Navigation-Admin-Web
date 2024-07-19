<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent.vue'
import { ref } from 'vue'
import { createNav, getNavById, updateNav } from '@/service/NavService'
import type { NavDTO } from '@/types/Nav'
import { navToNavDTO } from '@/utils/Convert'
import CategorySelect from '@/components/category/CategorySelect.vue'
import TagSelect from '@/components/tag/TagSelect.vue'

const emits = defineEmits<{
  confirm: []
}>()

const defaultForm: NavDTO = {
  id: 0,
  name: '',
  url: '',
  description: '',
  tags: [],
  category: 0
}
const dialogVisible = ref(false)
const isAdd = ref(true)
const form = ref<NavDTO>({ ...defaultForm })

const open = async (id?: number) => {
  dialogVisible.value = true

  //判断模式
  isAdd.value = id === undefined
  form.value = { ...defaultForm }

  if (id != undefined) {
    const nav = await getNavById(id)

    form.value = { ...navToNavDTO(nav) }
  }
}

const confirm = async () => {
  if (isAdd.value) {
    await createNav(form.value)
  } else {
    await updateNav(form.value)
  }

  dialogVisible.value = false
  emits('confirm')
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
    <el-form :model="form">
      <el-form-item :label="$t('other.name')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('nav.url')">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item :label="$t('nav.description')">
        <el-input v-model="form.description" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.tag')">
        <TagSelect v-model="form.tags" width="100%"></TagSelect>
      </el-form-item>
      <el-form-item :label="$t('manage.category')">
        <CategorySelect v-model="form.category" width="100%"></CategorySelect>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
