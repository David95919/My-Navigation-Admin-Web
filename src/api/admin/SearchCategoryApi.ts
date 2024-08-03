import axios from '@/config/axios_admin'
import type { Result } from '@/types/Result'
import type { SearchCategory } from '@/types/SearchCategory'

export async function get() {
  return (await axios.get<Result<SearchCategory[]>>('/search/category')).data
}

export async function getById(id: number) {
  return (await axios.get<Result<SearchCategory>>(`/search/category/${id}`)).data
}

export async function create(searchCategory: SearchCategory) {
  return (await axios.post<Result<void>>('/search/category', searchCategory)).data
}

export async function update(searchCategory: SearchCategory) {
  return (await axios.put<Result<void>>('/search/category', searchCategory)).data
}

export async function deleteById(id: number) {
  return (await axios.delete<Result<void>>(`/search/category/${id}`)).data
}
