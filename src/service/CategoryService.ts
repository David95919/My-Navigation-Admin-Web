import {get} from "@/api/CategoryApi";

export async function getCategory() {
    const category = await get();

    if (category.code === 0) return []

    return category.data
}
