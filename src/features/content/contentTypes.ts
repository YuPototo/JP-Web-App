export type IChapter = {
    id: string
    title: string
}

export type ISection = {
    id: string
    title: string
    chapters: IChapter[]
}
