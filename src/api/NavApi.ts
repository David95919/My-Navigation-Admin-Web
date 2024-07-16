import axios from "@/config/axios";
import type {Result} from "@/types/Result";
import type {Nav, NavDTO, NavQueryConfig} from "@/types/Nav";

export async function get(query: NavQueryConfig) {
    return (await axios.get<Result<Nav[]>>('/nav', {params: query})).data
}

export async function getById(id: number) {
    return (await axios.get<Result<Nav>>(`/nav/${id}`)).data
}

export async function create(nav: NavDTO) {
    return (await axios.post<Result<void>>('/nav', nav)).data
}

export async function deleteById(id: number) {
    return (await axios.delete<Result<void>>(`/nav/${id}`)).data
}

export async function update(nav: NavDTO) {
    return (await axios.delete<Result<void>>('/nav', nav)).data
}
