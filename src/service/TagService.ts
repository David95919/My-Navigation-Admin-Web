import {get} from "@/api/TagApi";

export async function getTag() {
    const tag = await get();

    if (tag.code === 0) return []

    return tag.data
}
