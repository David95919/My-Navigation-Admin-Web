import axios from '@/config/axios_user'
import type { Result } from '@/types/Result'
import type { SearchCategory } from '@/types/SearchCategory'

export async function get() {
  return (await axios.get<Result<SearchCategory[]>>('/search/category')).data
}
