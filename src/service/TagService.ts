import {get, deleteById, getById, update} from "@/api/TagApi";
import {success, error} from "@/utils/Message";
import type {Tag} from "@/types/Tag";

export async function getTag() {
    const result = await get();

    if (result.code === 0) {
        error(result.msg)
        return []
    }

    return result.data
}

export async function getTagById(id: number) {
    const result = await getById(id);

    if (result.code === 0) error(result.msg)

    return result.data
}

export async function deleteTagById(id: number) {
    const result = await deleteById(id);

    if (result.code === 1) success(result.msg)
}

export async function updateTag(tag: Tag) {
    const result = await update(tag);

    if (result.code === 0) error(result.msg)
    if (result.code === 1) success(result.msg)
}
