export interface QuestionSetState {
    questionSetId: string | null
    practiceMode: PracticeMode | null
    optionsSelected: number[]
    isError: boolean
}

export enum PracticeMode {
    Chapter,
    Notebook,
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
    id: string
    body?: string
    questions: IQuestion[]
    explanation?: string
    audio?: IAudio
}
