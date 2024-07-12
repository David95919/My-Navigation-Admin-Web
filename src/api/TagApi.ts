import axios from "@/config/axios";
import type {Result} from "@/types/Result";
import type {Tag} from "@/types/Tag";

export async function get() {
    return (await axios.get<Result<Tag[]>>('/tag')).data
}

