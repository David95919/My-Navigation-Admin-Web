import type { Nav, NavUserQueryConfig } from '@/types/Nav'
import axios from '@/config/axios_user'
import type { ResultPage } from '@/types/Result'

export async function get(query: NavUserQueryConfig) {
  return (
    await axios.get<ResultPage<Nav[]>>('/nav', {
      params: {
        category: query.category,
        current: query.current,
        size: query.size
      }
    })
  ).data
}
