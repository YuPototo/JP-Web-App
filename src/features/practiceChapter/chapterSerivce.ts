import { splitApi } from '../../store/query/splitApi'

interface ChapterInfo {
    id: string
    title: string
    desc?: string
    questionSets: string[]
}

export const chapterApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getChapter: build.query<ChapterInfo, string>({
            query: (chapterId) => `chapters/${chapterId}`,
            transformResponse: (res: { chapter: ChapterInfo }) => res.chapter,
        }),
    }),
})

export const { useGetChapterQuery } = chapterApi
