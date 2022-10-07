import { INode } from 'jp_to_react/dist/type'

export interface QuestionSetState {
    questionSetId: string | null
    practiceMode: PracticeMode | null
    optionsSelected: number[]
    isError: boolean
}

export enum PracticeMode {
    Chapter,
    Notebook,
    WrongRecord,
}

export interface IQuestion {
    body?: RichText
    explanation?: RichText
    options: RichText[]
    answer: number
}

export interface IAudio {
    key: string
    transcription?: string
}

export interface IQuestionSet {
    id: string
    body?: RichText
    questions: IQuestion[]
    explanation?: RichText
    audio?: IAudio
}

export type RichText = INode[]
