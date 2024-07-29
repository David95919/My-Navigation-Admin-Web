<script setup lang="ts">
import { ref, watch } from 'vue'
import { getNav } from '@/service/user/NavService'
import type { ResultPage } from '@/types/Result'
import type { Nav } from '@/types/Nav'

const props = defineProps<{ categoryId: number }>()
const navList = ref<ResultPage<Nav[]>>()
const iconUrl =
  'https://t3.gstatic.cn/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url='

watch(
  () => props.categoryId,
  () => {
    getNavList()
  }
)

const getNavList = async () => {
  navList.value = await getNav({ current: 1, size: 100, category: props.categoryId })
}

getNavList()
</script>
<template>
  <div class="manage">
    <el-card v-for="nav in navList?.records" class="item">
      <el-avatar class="icon" :src="iconUrl + nav.url" :size="24"></el-avatar>
      <el-link :href="nav.url" target="_blank">{{ nav.name }}</el-link>
    </el-card>
  </div>
</template>
<style scoped lang="less">
.manage {
  display: flex;
  flex-wrap: wrap;

  :deep(.item) {
    display: flex;
    margin: 10px;
    width: 10vw;

    .el-card__body {
      display: flex;
      padding: 10px;
      justify-content: center;
      align-content: center;
      width: 100%;
      height: 100%;

      .icon {
        margin: auto 5px auto 0;
      }

      :deep(.el-link__inner) {
        font-size: 1.2em;
      }
    }
  }
}
</style>
