<script setup lang="ts">
import DialogComponent from '@/components/DialogComponent.vue'
import { ref } from 'vue'
import { createUser, getUserById, updateUser } from '@/service/UserService'

const emits = defineEmits<{
  confirm: []
}>()

const dialogVisible = ref(false)
const isAdd = ref(true)
const editId = ref(-1)
const form = ref<{ username: string; password: string }>({ username: '', password: '' })

const open = async (id?: number) => {
  dialogVisible.value = true

  //判断模式
  isAdd.value = id === undefined
  form.value = { username: '', password: '' }

  if (id != undefined) {
    editId.value = id
    form.value = { ...(await getUserById(id)) }
  }
}

const confirm = async () => {
  if (isAdd.value) {
    await createUser({ id: 0, username: form.value.username, password: form.value.password })
  } else {
    await updateUser({
      id: editId.value,
      username: form.value.username,
      password: form.value.password
    })
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
      <el-form-item :label="$t('user.username')">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
  </DialogComponent>
</template>
<style scoped></style>
