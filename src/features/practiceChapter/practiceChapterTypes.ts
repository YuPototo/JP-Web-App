import { Result } from './practiceChapterSlice'

export interface PracticeChapterState {
    chapterId: string | null
    questionSetIndex: number
    results: QuestionSetResult[]
}

export interface QuestionSetResult {
    questionSetId: string
    result: Result
}
