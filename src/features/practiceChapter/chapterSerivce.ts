import { splitApi } from '../../store/query/splitApi'
import { RootState } from '../../store/store'

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

/* api slice selectors */

export const selectChapterQuetionSetIds = (chapterId: string) => {
    return chapterApi.endpoints.getChapter.select(chapterId)
}
