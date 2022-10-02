/* cateogry */
export type CategoryKey = string

export interface ICategory {
    key: CategoryKey
    displayValue: string
    children?: ICategory[]
}

/* books */
interface BookCategory {
    key: CategoryKey
    child?: BookCategory
}

export interface IBook {
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
    desc?: string
}

export type ISection = {
    id: string
    title: string
    chapters: IChapter[]
}
