import { get } from '@/api/user/SearchCategoryApi'
import { error } from '@/utils/Message'

export async function getSearchCategory() {
  const result = await get()

  if (result.code === 0) {
    error(result.msg)
    return []
  }

  return result.data
}
