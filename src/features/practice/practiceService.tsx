import { splitApi } from '../../store/query/splitApi'

interface ChapterInfo {
    id: string
    title: string
    desc?: string
    questionSets: string[]
}

export interface IQuestion {
    body?: string
    explanation?: string
    options: string[]
    answer: number
}

export interface IAudio {
    key: string
    transcription?: string
}

export interface IQuestionSet {
    body?: string
    questions: IQuestion[]
    explanation?: string
    audio?: IAudio
}

export const practiceApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getChapter: build.query<ChapterInfo, string>({
            query: (chapterId) => `chapters/${chapterId}`,
            transformResponse: (res: { chapter: ChapterInfo }) => res.chapter,
        }),
        getQuestionSet: build.query<IQuestionSet, string>({
            query: (questionSetId) => `questionSets/${questionSetId}`,
            transformResponse: (res: { questionSet: IQuestionSet }) =>
                res.questionSet,
        }),
    }),
})

export const { useGetChapterQuery, useGetQuestionSetQuery } = practiceApi
