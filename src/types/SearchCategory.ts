import type { Search } from '@/types/Search'

export type SearchCategory = {
  id: number
  name: string
}

export type SearchCategoryShow = {
  id: number
  name: string
  search: Search[]
}
