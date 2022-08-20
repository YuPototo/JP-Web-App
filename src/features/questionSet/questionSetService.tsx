import { splitApi } from '../../store/query/splitApi'

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
    id: string
    body?: string
    questions: IQuestion[]
    explanation?: string
    audio?: IAudio
}

export const questionSetApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestionSet: build.query<IQuestionSet, string>({
            query: (questionSetId) => `questionSets/${questionSetId}`,
            transformResponse: (res: { questionSet: IQuestionSet }) =>
                res.questionSet,
        }),
    }),
})

export const { useGetQuestionSetQuery } = questionSetApi
