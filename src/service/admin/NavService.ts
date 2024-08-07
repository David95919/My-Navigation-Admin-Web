import type { Nav, NavDTO, NavQueryConfig } from '@/types/Nav'
import { create, deleteById, get, getById, update, multipleDelete } from '@/api/admin/NavApi'
import { confirmDeletion, success } from '@/utils/Message'
import type { Tag } from '@/types/Tag'

export async function getNav(query: NavQueryConfig) {
  const newQuery: NavQueryConfig = { current: query.current, size: query.size }

  if (query.name != null) if (query.name.length >= 1) newQuery.name = query.name
  if (query.category != null) newQuery.category = query.category
  if (query.tag != null) newQuery.tag = query.tag

  return await get(newQuery)
}

export async function getNavById(id: number) {
  const nav = await getById(id)
  return nav.data
}

export async function createNav(nav: NavDTO) {
  const result = await create(nav)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function deleteNavById(id: number) {
  const isConfirm = await confirmDeletion()

  if (isConfirm) {
    const result = await deleteById(id)

    if (result.code === 1) success(result.msg)
  }
}

export async function updateNav(nav: NavDTO) {
  const result = await update(nav)

  if (result.code === 1) success(result.msg)

  return result.code !== 0
}

export async function multipleDeleteNav(navs: Nav[]) {
  const isConfirm = await confirmDeletion()
  if (isConfirm) {
    const ids: number[] = []
    navs.forEach((item) => ids.push(item.id))

    const result = await multipleDelete(ids)

    if (result.code === 1) success(result.msg)
  }
}
