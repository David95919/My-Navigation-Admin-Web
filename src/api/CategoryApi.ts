import axios from "@/config/axios";
import type {Result} from "@/types/Result";
import type {Category} from "@/types/Category";

export async function get(){
    return (await axios.get<Result<Category[]>>('/category')).data
}
