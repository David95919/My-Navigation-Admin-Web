import { get, create, deleteById, getById, update } from '@/api/admin/SearchCategoryApi'
import { confirmDeletion, error, success } from '@/utils/Message'
import type { SearchCategory } from '@/types/SearchCategory'

export async function getSearchCategory() {
  const result = await get()

  if (result.code === 0) {
    error(result.msg)
    return []
  }

  return result.data
}

export async function getSearchCategoryId(id: number) {
  const result = await getById(id)

  return result.data
}

export async function deleteSearchCategory(id: number) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const result = await deleteById(id)

    if (result.code === 1) success(result.msg)
  }
}

export async function updateSearchCategory(searchCategory: SearchCategory) {
  const result = await update(searchCategory)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function createSearchCategory(searchCategory: SearchCategory) {
  const result = await create(searchCategory)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}
