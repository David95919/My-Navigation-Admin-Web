import {deleteById, get} from "@/api/CategoryApi";
import {success} from "@/utils/Message";

export async function getCategory() {
    const category = await get();

    if (category.code === 0) return []

    return category.data
}

export async function deleteCategoryById(id: number) {
    const result = await deleteById(id);

    if (result.code === 1) success(result.msg)
}
