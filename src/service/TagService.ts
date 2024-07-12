import {get, deleteById} from "@/api/TagApi";
import {success} from "@/utils/Message";

export async function getTag() {
    const tag = await get();

    if (tag.code === 0) return []

    return tag.data
}

export async function deleteTagById(id: number) {
    const result = await deleteById(id);

    if (result.code === 1) success(result.msg)
}
