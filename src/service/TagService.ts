import {get, deleteById, getById, update, create, multipleDelete} from "@/api/TagApi";
import {success, error, confirmDeletion} from "@/utils/Message";
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

    return result.data
}

export async function deleteTagById(id: number) {
    const isConfirm = await confirmDeletion();
    if (isConfirm) {
        const result = await deleteById(id);

        if (result.code === 1) success(result.msg)
    }
}

export async function updateTag(tag: Tag) {
    const result = await update(tag);

    if (result.code === 1) success(result.msg)
}

export async function createTag(tag: Tag) {
    const result = await create(tag);

    if (result.code === 1) success(result.msg)
}

export async function multipleDeleteTag(tags: Tag[]) {
    const isConfirm = await confirmDeletion();
    if (isConfirm) {
        const ids: number[] = []
        tags.forEach(item => ids.push(item.id))

        const result = await multipleDelete(ids)

        if (result.code === 1) success(result.msg)
    }
}
