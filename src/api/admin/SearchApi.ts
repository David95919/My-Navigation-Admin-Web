import axios from '@/config/axios_admin'
import type { Result } from '@/types/Result'
import type { Search, SearchDTO, SearchQueryConfig } from '@/types/Search'

export async function get(query: SearchQueryConfig) {
  return (await axios.get<Result<Search[]>>('/search', { params: query })).data
}

export async function getById(id: number) {
  return (await axios.get<Result<Search>>(`/search/${id}`)).data
}

export async function create(search: SearchDTO) {
  return (await axios.post<Result<void>>('/search', search)).data
}

export async function update(search: SearchDTO) {
  return (await axios.put<Result<void>>('/search', search)).data
}

export async function deleteById(id: number) {
  return (await axios.delete<Result<void>>(`/search/${id}`)).data
}
