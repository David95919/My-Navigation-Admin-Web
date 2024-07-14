<script setup lang="ts">
import DialogComponent from "@/components/DialogComponent.vue";
import {ref} from "vue";
import {createTag, getTagById, updateTag} from "@/service/TagService";

const emits = defineEmits<{
  confirm: [],
}>();

const dialogVisible = ref(false)
const isAdd = ref(true)
const editId = ref(-1)
const form = ref<{ name: string }>({name: ''})

const open = async (id?: number) => {
  dialogVisible.value = true

  //判断模式
  isAdd.value = id === undefined
  form.value = {name: ''}

  if (id != undefined) {
    editId.value = id
    form.value = {...await getTagById(id)}
  }
}

const confirm = async () => {
  if (isAdd.value) {
    await createTag({id: 0, name: form.value.name})
  } else {
    await updateTag({id: editId.value, name: form.value.name});
  }

  dialogVisible.value = false
  emits('confirm')
}

defineExpose({
  open
})
</script>
<template>
  <DialogComponent v-model:visible="dialogVisible" :title="isAdd ? 'AddTag':'EditTag' " @confirm="confirm">
    <el-form :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped>
</style>
