import type {Tag} from "@/types/Tag";
import type {Category} from "@/types/Category";

export type NavQueryConfig = {
    name?: string,
    category?: number | null,
    tag?: number | null
}

export type Nav = {
    id: number,
    name: string,
    url: string,
    description: string,
    tags: Tag[],
    category: Category
}

export type NavDTO = {
    id: number,
    name: string,
    url: string,
    description: string,
    tags: number[],
    category: number
}
