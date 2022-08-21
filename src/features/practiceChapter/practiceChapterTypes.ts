export interface PracticeChapterState {
    chapterId: string | null
    results: QuestionSetResult[]
}

export enum Result {
    Right,
    Wrong,
    NoRecord,
}

export interface QuestionSetResult {
    questionSetId: string
    result: Result
}
