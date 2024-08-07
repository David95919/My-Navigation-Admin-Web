import type { SearchQueryConfig } from '@/types/Search'
import { get } from '@/api/user/SearchApi'
import { error } from '@/utils/Message'

export async function getSearch(query: SearchQueryConfig) {
  const result = await get(query)

  if (result.code === 0) {
    error(result.msg)
    return []
  }

  return result.data
}
