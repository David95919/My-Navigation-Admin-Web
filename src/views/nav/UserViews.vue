<script setup lang="ts">
import {deleteUserById, getUser} from "@/service/UserService";
import {ref, computed} from "vue";
import type {UserVO} from "@/types/User";
import type UserDialogComponent from "@/components/user/UserDialogComponent.vue";

const userDialog = ref<InstanceType<typeof UserDialogComponent> | null>(null)
const userList = ref<UserVO[]>([]);
const search = ref('')
const filterTableData = computed(() =>
    userList.value.filter((data) =>
        !search.value ||
        data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)

const handleGetUser = async () => {
  userList.value = await getUser()
}
const handleDelete = async (id: number) => {
  await deleteUserById(id)
  handleGetUser()
}

const handleEdit = (id: number) => {
  userDialog.value?.open(id)
}

const handleAdd = () => {
  userDialog.value?.open()
}

handleGetUser()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.user') }}</div>
        <div>
          <el-button plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button disabled plain type="danger">{{ $t('other.delete') }}</el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table :data="filterTableData" border>
        <el-table-column prop="id" label="Id"/>
        <el-table-column prop="username" :label="$t('user.username')"/>
        <el-table-column label="Operations">
          <template #header>
            <el-input v-model="search" size="small" :placeholder="$t('other.search')"/>
          </template>
          <template #default="scope">
            <el-button plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }}</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)">{{ $t('other.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
  <UserDialogComponent ref="userDialog" @confirm="handleGetUser"></UserDialogComponent>
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
