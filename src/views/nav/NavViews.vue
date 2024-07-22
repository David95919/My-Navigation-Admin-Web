<script setup lang="ts">
import type { Nav, NavQueryConfig } from '@/types/Nav'
import { computed, ref } from 'vue'
import TagSelect from '@/components/tag/TagSelect.vue'
import CategorySelect from '@/components/category/CategorySelect.vue'
import { deleteNavById, getNav } from '@/service/NavService'
import NavDialogComponent from '@/components/nav/NavDialogComponent.vue'

const navDialog = ref<InstanceType<typeof NavDialogComponent> | null>(null)
const queryConfig = ref<NavQueryConfig>({
  name: '',
  category: null,
  tag: [],
  current: 1,
  size: 10
})
const navList = ref<Nav[]>([])
const filterTableData = computed(() =>
  navList.value.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const search = ref('')
const total = ref(0)

const handleQuery = async () => {
  const page = await getNav(queryConfig.value)
  navList.value = page.records
  total.value = page.total
}

const handleClear = async () => {
  queryConfig.value.name = ''
  queryConfig.value.category = null
  queryConfig.value.tag = []
}

const handleEdit = (id: number) => {
  navDialog.value?.open(id)
}

const handleAdd = () => {
  navDialog.value?.open()
}

const handleMultipleDelete = () => {}

const handleDelete = async (id: number) => {
  await deleteNavById(id)
  handleQuery()
}

handleQuery()
</script>
<template>
  <el-card class="card" shadow="always">
    <template #header>
      <div class="header">
        <div class="title">{{ $t('manage.navigation') }}</div>
        <div class="right">
          <el-form inline :model="queryConfig">
            <el-form-item :label="$t('other.name')">
              <el-input v-model="queryConfig.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manage.category')">
              <CategorySelect v-model="queryConfig.category"></CategorySelect>
            </el-form-item>
            <el-form-item :label="$t('manage.tag')">
              <TagSelect disabled v-model="queryConfig.tag"></TagSelect>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleQuery">{{ $t('other.query') }}</el-button>
              <el-button @click="handleClear">{{ $t('other.clear') }}</el-button>
            </el-form-item>
          </el-form>
          <el-button plain @click="handleAdd">{{ $t('other.add') }}</el-button>
          <el-button disabled plain type="danger" @click="handleMultipleDelete"
            >{{ $t('other.delete') }}
          </el-button>
        </div>
      </div>
    </template>
    <template #default>
      <el-table :data="filterTableData" border>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" :label="$t('other.name')"></el-table-column>
        <el-table-column prop="url" :label="$t('nav.url')">
          <template #default="scope">
            <el-popover trigger="hover" :content="scope.row.url" placement="left">
              <template #reference>
                <el-link class="url" :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="description" :label="$t('nav.description')">
          <template #default="scope">
            <div class="description">{{ scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="tags" :label="$t('manage.tag')">
          <template #default="scope">
            <el-tag v-for="tag in scope.row.tags" :key="tag.id"> {{ tag.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" :label="$t('manage.category')">
          <template #default="scope">
            <el-tag> {{ scope.row.category.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template #header>
            <el-input v-model="search" size="small" :placeholder="$t('other.search')" />
          </template>
          <template #default="scope">
            <el-button plain @click="handleEdit(scope.row.id)">{{ $t('other.edit') }} </el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row.id)"
              >{{ $t('other.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        v-model:total="total"
        v-model:current-page="queryConfig.current"
        v-model:page-size="queryConfig.size"
        @change="handleQuery"
      />
    </template>
  </el-card>
  <NavDialogComponent ref="navDialog" @confirm="handleQuery"></NavDialogComponent>
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

.description,.url {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
