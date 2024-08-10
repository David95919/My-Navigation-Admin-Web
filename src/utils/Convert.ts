import type { Nav, NavDTO } from '@/types/Nav'
import type { SearchCategory, SearchCategoryShow } from '@/types/SearchCategory'

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

// 转换函数
function searchCategoryToSearchCategoryShow(category: SearchCategory): SearchCategoryShow {
  return {
    id: category.id,
    name: category.name,
    search: [] // 这里将 search 设置为空数组
  }
}

// 转换数组的函数
export function searchCategoryToSearchCategoryShowArray(
  categories: SearchCategory[]
): SearchCategoryShow[] {
  return categories.map(searchCategoryToSearchCategoryShow)
}
