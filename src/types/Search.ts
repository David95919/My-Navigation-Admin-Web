import type { SearchCategory } from '@/types/SearchCategory'

export type Search = {
  id: number
  name: string
  url: string
  searchCategory: SearchCategory
}

export type SearchDTO = {
  id: number
  name: string
  url: string
  categoryId: number
}

export type SearchQueryConfig ={
  searchCategoryId: number | null
}
