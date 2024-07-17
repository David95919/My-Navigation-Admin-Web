import type {NavDTO, NavQueryConfig} from "@/types/Nav";
import {create, deleteById, get, getById, update} from "@/api/NavApi";
import {confirmDeletion, success} from "@/utils/Message";

export async function getNav(query: NavQueryConfig) {
    const newQuery: NavQueryConfig = {}

    if (query.name != null) if (query.name.length >= 1) newQuery.name = query.name
    if (query.category != null) newQuery.category = query.category
    if (query.tag != null) newQuery.tag = query.tag

    const result = await get(newQuery);

    return result.data
}

export async function getNavById(id: number) {
    const nav = await getById(id);

    return nav.data
}

export async function createNav(nav: NavDTO) {
    const result = await create(nav);

    if (result.code === 1) success(result.msg)
}

export async function deleteNavById(id: number) {
    const isConfirm = await confirmDeletion();

    if (isConfirm) {
        const result = await deleteById(id);

        if (result.code === 1) success(result.msg)
    }
}

export async function updateNav(nav: NavDTO) {
    const result = await update(nav);

    if (result.code === 1) success(result.msg)
}
