<script setup lang="ts">
import { ref } from 'vue'
import { createSearchCategory, getSearchCategory } from '@/service/admin/SearchCategoryService'
import type { SearchCategory } from '@/types/SearchCategory'

const props = withDefaults(
  defineProps<{
    default?: number
    width?: string
    maxShowSearchCategory?: number
  }>(),
  {
    width: '12vw',
    max_show_searchCategory: 3
  }
)

const selectValue = ref(props.default)
const searchCategoryList = ref<SearchCategory[]>([])
const isAdd = ref(false)
const searchCategoryInput = ref('')

const handleGetSearchCategory = async () => {
  searchCategoryList.value = await getSearchCategory()
}

const handleConfirm = async () => {
  isAdd.value = false
  await createSearchCategory({ id: 0, name: searchCategoryInput.value })
  handleGetSearchCategory()
}

const handleCancel = () => {
  isAdd.value = false
  searchCategoryInput.value = ''
}

handleGetSearchCategory()
</script>
<template>
  <el-select
    v-model="selectValue"
    filterable
    :placeholder="$t('other.select')"
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="maxShowSearchCategory"
    clearable
    :style="{ width: props.width }"
  >
    <el-option
      v-for="searchCategory in searchCategoryList"
      :key="searchCategory.id"
      :value="searchCategory.id"
      :label="searchCategory.name"
    ></el-option>
    <template #footer>
      <el-button v-if="!isAdd" size="small" @click="isAdd = true"
        >{{ $t('searchCategory.add_prompt') }}
      </el-button>
      <template v-else>
        <el-input size="small" v-model="searchCategoryInput" style="width: 5vw"></el-input>
        <el-button type="primary" size="small" @click="handleConfirm"
          >{{ $t('other.confirm') }}
        </el-button>
        <el-button size="small" @click="handleCancel">{{ $t('other.cancel') }}</el-button>
      </template>
    </template>
  </el-select>
</template>
<style scoped></style>
