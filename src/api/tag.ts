import axios from "@/config/axios";
import type {Result} from "@/types/Result";
import type {Tag} from "@/types/Tag";

export async function get(): Promise<Result<Tag[]>> {
    return (await axios.get('/tag')).data
}

