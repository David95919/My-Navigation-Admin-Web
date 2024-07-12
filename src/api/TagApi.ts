import axios from "@/config/axios";
import type {Result} from "@/types/Result";
import type {Tag} from "@/types/Tag";

export async function get() {
    return (await axios.get<Result<Tag[]>>('/tag')).data
}

export async function deleteById(id: number) {
    return (await axios.delete<Result<void>>(`/tag/${id}`)).data
}
