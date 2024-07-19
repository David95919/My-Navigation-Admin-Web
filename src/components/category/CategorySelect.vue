<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '@/types/Category'
import { createCategory, getCategory } from '@/service/CategoryService'

const props = withDefaults(
  defineProps<{
    default?: number
    width?: string
  }>(),
  {
    width: '12vw'
  }
)

const selectValue = ref(props.default)
const categoryList = ref<Category[]>([])
const isAdd = ref(false)
const categoryInput = ref('')

const handleGetCategory = async () => {
  categoryList.value = await getCategory()
}

const handleConfirm = async () => {
  isAdd.value = false
  await createCategory({ id: 0, name: categoryInput.value })
  handleGetCategory()
}

const handleCancel = () => {
  isAdd.value = false
  categoryInput.value = ''
}

handleGetCategory()
</script>
<template>
  <el-select
    v-model="selectValue"
    filterable
    :placeholder="$t('other.select')"
    clearable
    :style="{ width: props.width }"
  >
    <el-option
      v-for="category in categoryList"
      :key="category.id"
      :value="category.id"
      :label="category.name"
    ></el-option>
    <template #footer>
      <el-button v-if="!isAdd" size="small" @click="isAdd = true"
        >{{ $t('category.add_prompt') }}
      </el-button>
      <template v-else>
        <el-input size="small" v-model="categoryInput" style="width: 5vw"></el-input>
        <el-button type="primary" size="small" @click="handleConfirm"
          >{{ $t('other.confirm') }}
        </el-button>
        <el-button size="small" @click="handleCancel">{{ $t('other.cancel') }}</el-button>
      </template>
    </template>
  </el-select>
</template>
<style scoped></style>
