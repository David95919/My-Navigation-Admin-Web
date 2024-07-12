import {get} from "@/api/tag";

export async function getTag() {
    const tag = await get();

    if (tag.code === 0) return []

    return tag.data
}
