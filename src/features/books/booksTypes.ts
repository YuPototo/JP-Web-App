/* cateogry */
export type CategoryKey = string

export interface Category {
    key: CategoryKey
    displayValue: string
    children?: Category[]
}

/* books */
interface BookCategory {
    key: CategoryKey
    child?: BookCategory
}

export interface Book {
    id: string
    title: string
    category: BookCategory
    cover: string
    desc: string
    hidden: boolean
}

export type IChapter = {
    id: string
    title: string
}

export type ISection = {
    id: string
    title: string
    chapters: IChapter[]
}
