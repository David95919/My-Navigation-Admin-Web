<script setup lang="ts">
import { ref } from 'vue'
import { getCategory } from '@/service/user/CategoryService'
import type { Category } from '@/types/Category'
import NavListComponent from '@/components/user/NavListComponent.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeName = ref('first')
const categoryList = ref<Category[]>()

const getCategoryList = async () => {
  //获取分类
  categoryList.value = await getCategory()

  //添加显示全部网站
  categoryList.value?.unshift({ id: 0, name: t('other.all') })

  //默认选择
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
