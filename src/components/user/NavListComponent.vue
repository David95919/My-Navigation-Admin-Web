<script setup lang="ts">
import { ref, watch } from 'vue'
import { getNav } from '@/service/user/NavService'
import type { ResultPage } from '@/types/Result'
import type { Nav } from '@/types/Nav'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{ categoryId: number }>()
const navList = ref<ResultPage<Nav[]>>({ code: 0, msg: '', total: 0, records: [] })
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
    <el-card
      class="item"
      v-for="nav in navList?.records"
      :key="nav.id"
      shadow="hover"
      v-if="navList?.records.length >= 1"
    >
      <a class="nav" :href="nav.url" target="_blank">
        <el-avatar class="icon" :src="iconUrl + nav.url" :size="24"></el-avatar>
        <span>{{ nav.name }}</span>
      </a>
      <div class="description" v-if="nav.description.length >= 1">{{ nav.description }}</div>
      <div class="tags" v-if="nav.tags.length >= 1">
        <el-tag type="primary" v-for="tag in nav.tags" :key="tag.id" class="tag"
          >{{ tag.name }}
        </el-tag>
      </div>
    </el-card>
    <el-empty class="empty" v-else :description="t('home.no_website')" />
  </div>
</template>
<style scoped lang="less">
.manage {
  display: flex;
  flex-wrap: wrap;

  .empty {
    width: 100%;
  }

  :deep(.item.is-hover-shadow:hover) {
    box-shadow: 0 0 12px rgba(95, 16, 210, 0.41);
  }

  :deep(.item) {
    display: flex;
    margin: 10px;
    width: 15vw;
    height: 100px;

    .el-card__body {
      display: flex;
      flex-direction: column;
      padding: 10px;
      justify-content: space-around;
      align-content: center;
      width: 100%;
      height: 100%;

      .nav {
        display: flex;
        justify-content: center;
        align-content: center;

        .icon {
          margin: auto 5px auto 0;
        }
      }

      .description {
        font-size: 0.9em;
        text-align: center;
      }

      .tags {
        display: flex;
        justify-content: space-evenly;
        width: 100%;

        .tag {
          cursor: pointer;
        }
      }

      :deep(.el-link__inner) {
        font-size: 1.2em;
      }
    }
  }
}
</style>
