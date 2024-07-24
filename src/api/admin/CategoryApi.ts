import axios from '@/config/axios_admin'
import type { Result } from '@/types/Result'
import type { Category } from '@/types/Category'

export async function get() {
  return (await axios.get<Result<Category[]>>('/category')).data
}

export async function deleteById(id: number) {
  return (await axios.delete<Result<void>>(`/category/${id}`)).data
}

export async function getById(id: number) {
  return (await axios.get<Result<Category>>(`/category/${id}`)).data
}

export async function update(category: Category) {
  return (await axios.put<Result<void>>('/category', category)).data
}

export async function create(category: Category) {
  return (await axios.post<Result<void>>('/category', category)).data
}

export async function multipleDelete(ids: number[]) {
  return (await axios.delete<Result<void>>('/category/multiple', { data: { ids } })).data
}
