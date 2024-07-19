import type { Nav, NavDTO } from '@/types/Nav'

export function navToNavDTO(data: Nav): NavDTO {
  const tags: number[] = []

  data.tags.forEach((item) => {
    tags.push(item.id)
  })

  const navDTO: NavDTO = {
    id: data.id,
    name: data.name,
    url: data.url,
    description: data.description,
    tags: tags,
    category: data.category.id
  }

  return navDTO
}
