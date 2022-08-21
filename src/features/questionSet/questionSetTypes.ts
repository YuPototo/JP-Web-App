export interface QuestionSetState {
    questionSetId: string | null
    practiceMode: PracticeMode | null
    optionsSelected: number[]
}

export enum PracticeMode {
    Chapter,
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
