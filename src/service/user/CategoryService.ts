import { get } from '@/api/user/CategoryApi'

export async function getCategory() {
  const category = await get()

  return category.data
}
