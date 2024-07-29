<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { getCategory } from '@/service/user/CategoryService'
import type { Category } from '@/types/Category'

const activeName = ref('first')
const categoryList = ref<Category[]>()

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const getCategoryList = async () => {
  categoryList.value = await getCategory()
  console.log(categoryList.value)
}

getCategoryList()
</script>
<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane
        v-for="category in categoryList"
        :label="category.name"
        :name="category.id"
        :key="category.id"
      >
        {{ category.name}}
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<style scoped lang="less"></style>
