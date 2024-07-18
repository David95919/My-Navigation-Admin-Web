import axios from '@/config/axios'
import type { Result } from '@/types/Result'
import type { Tag } from '@/types/Tag'

export async function get() {
  return (await axios.get<Result<Tag[]>>('/tag')).data
}

export async function deleteById(id: number) {
  return (await axios.delete<Result<void>>(`/tag/${id}`)).data
}

export async function getById(id: number) {
  return (await axios.get<Result<Tag>>(`/tag/${id}`)).data
}

export async function update(tag: Tag) {
  return (await axios.put<Result<void>>('/tag', tag)).data
}

export async function create(tag: Tag) {
  return (await axios.post<Result<void>>('/tag', tag)).data
}

export async function multipleDelete(ids: number[]) {
  return (await axios.delete<Result<void>>('/tag/multiple', { data: { ids } })).data
}
