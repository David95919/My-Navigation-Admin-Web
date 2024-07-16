import type {Tag} from "@/types/Tag";
import type {Category} from "@/types/Category";

export type NavQueryConfig = {
    name?: string,
    category?: number,
    tag?: number
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
