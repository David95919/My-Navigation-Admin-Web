<script setup lang="ts">
import type {NavQueryConfig} from "@/types/Nav";
import {ref} from "vue";

const queryConfig = ref<NavQueryConfig>({name: '', category: 0, tag: 0})

const handleAdd = () => {

}

const handleMultipleDelete = () => {

}
const handleQuery = () => {

}
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.navigation') }}</div>
        <div class="right">
          <el-form inline :model="queryConfig">
            <el-form-item label="名字">
              <el-input v-model="queryConfig.name"></el-input>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="queryConfig.category"></el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select v-model="queryConfig.tag"></el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleQuery">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-button disabled plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button disabled plain type="danger" @click="handleMultipleDelete">{{ $t('other.delete') }}</el-button>
        </div>
      </div>
    </template>
    <template #default>
      default
    </template>
    <template #footer>
      footer
    </template>

  </el-card>
</template>
<style scoped lang="less">
.card {
  .title {
    font-size: 1.25em;
  }
}

.header {
  display: flex;
  justify-content: space-between;

  .right {
    display: flex;

    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
}
</style>
