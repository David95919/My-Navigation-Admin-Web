import type { NavUserQueryConfig } from '@/types/Nav'
import { get } from '@/api/user/NavApi'

export async function getNav(query: NavUserQueryConfig) {
  return await get(query)
}
