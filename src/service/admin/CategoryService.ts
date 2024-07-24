import { deleteById, get, create, getById, multipleDelete, update } from '@/api/admin/CategoryApi'
import { confirmDeletion, success } from '@/utils/Message'
import type { Category } from '@/types/Category'

export async function getCategory() {
  const category = await get()

  if (category.code === 0) return []

  return category.data
}

export async function deleteCategoryById(id: number) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const result = await deleteById(id)

    if (result.code === 1) success(result.msg)
  }
}

export async function getCategoryById(id: number) {
  const result = await getById(id)

  return result.data
}

export async function updateCategory(category: Category) {
  const result = await update(category)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function createCategory(category: Category) {
  const result = await create(category)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function multipleDeleteCategory(category: Category[]) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const ids: number[] = []
    category.forEach((item) => ids.push(item.id))

    const result = await multipleDelete(ids)

    if (result.code === 1) success(result.msg)
  }
}
