<script setup lang="ts">
import { ref } from 'vue'
import { getCategory } from '@/service/user/CategoryService'
import type { Category } from '@/types/Category'
import NavListComponent from '@/components/user/NavListComponent.vue'

const activeName = ref('first')
const categoryList = ref<Category[]>()

const getCategoryList = async () => {
  categoryList.value = await getCategory()
  if (categoryList.value?.length >= 1) activeName.value = categoryList.value[0].name
}

getCategoryList()
</script>
<template>
  <el-card>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane
        v-for="category in categoryList"
        :label="category.name"
        :name="category.name"
        :key="category.id"
        lazy
      >
        <NavListComponent :category-id="category.id"></NavListComponent>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<style scoped lang="less"></style>
