<script setup lang="ts">
import { ref } from 'vue'
import { createTag, getTag } from '@/service/admin/TagService'
import type { Tag } from '@/types/Tag'

const props = withDefaults(
  defineProps<{
    default?: number
    width?: string
    maxShowTags?: number
  }>(),
  {
    width: '12vw',
    max_show_tags: 3
  }
)

const selectValue = ref(props.default)
const tags = ref<Tag[]>([])
const isAdd = ref(false)
const tagInput = ref('')

const handleGetTag = async () => {
  tags.value = await getTag()
}

const handleConfirm = async () => {
  isAdd.value = false
  await createTag({ id: 0, name: tagInput.value })
  handleGetTag()
}

const handleCancel = () => {
  isAdd.value = false
  tagInput.value = ''
}

handleGetTag()
</script>
<template>
  <el-select
    v-model="selectValue"
    filterable
    :placeholder="$t('other.select')"
    multiple
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="maxShowTags"
    clearable
    :style="{ width: props.width }"
  >
    <el-option v-for="tag in tags" :key="tag.id" :value="tag.id" :label="tag.name"></el-option>
    <template #footer>
      <el-button v-if="!isAdd" size="small" @click="isAdd = true"
        >{{ $t('tag.add_prompt') }}
      </el-button>
      <template v-else>
        <el-input size="small" v-model="tagInput" style="width: 5vw"></el-input>
        <el-button type="primary" size="small" @click="handleConfirm"
          >{{ $t('other.confirm') }}
        </el-button>
        <el-button size="small" @click="handleCancel">{{ $t('other.cancel') }}</el-button>
      </template>
    </template>
  </el-select>
</template>
<style scoped></style>
