import type { Search, SearchQueryConfig } from '@/types/Search'
import axios from '@/config/axios_user'
import type { Result } from '@/types/Result'

export async function get(query: SearchQueryConfig) {
  return (await axios.get<Result<Search[]>>('/search', { params: query })).data
}
