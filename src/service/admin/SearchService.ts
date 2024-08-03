import { get, create, deleteById, getById, update } from '@/api/admin/SearchApi'
import { confirmDeletion, error, success } from '@/utils/Message'
import type { SearchDTO, SearchQueryConfig } from '@/types/Search'

export async function getSearch(query: SearchQueryConfig) {
  const result = await get(query)

  if (result.code === 0) {
    error(result.msg)
    return []
  }

  return result.data
}

export async function getSearchById(id: number) {
  const result = await getById(id)

  return result.data
}

export async function deleteSearch(id: number) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const result = await deleteById(id)

    if (result.code === 1) success(result.msg)
  }
}

export async function updateSearch(search: SearchDTO) {
  const result = await update(search)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function createSearch(search: SearchDTO) {
  const result = await create(search)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}
