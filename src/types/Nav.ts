import type { Tag } from '@/types/Tag'
import type { Category } from '@/types/Category'

export type NavQueryConfig = {
  name?: string
  category?: number | null
  tag?: number[] | null
  current: number
  size: number
}

export type NavUserQueryConfig = {
  category: number
  current: number
  size: number
}

export type Nav = {
  id: number
  name: string
  url: string
  description: string
  tags: Tag[]
  category: Category
}

export type NavDTO = {
  id: number
  name: string
  url: string
  description: string
  tags: number[]
  category: number | null
}
