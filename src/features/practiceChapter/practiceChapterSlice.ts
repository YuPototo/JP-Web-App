import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionSetResult } from './practiceChapterTypes'
import type { RootState } from '../../store/store'

export enum Result {
    Right,
    Wrong,
    NoRecord,
}

export interface PracticeChapterState {
    chapterId: string | null
    results: QuestionSetResult[]
}

const initialState: PracticeChapterState = {
    chapterId: null,
    results: [],
}

export const practiceChapterSlice = createSlice({
    name: 'practiceChapter',
    initialState,
    reducers: {
        chapterUsed: (state, { payload }: PayloadAction<string>) => {
            state.chapterId = payload
        },
        initResults: (state, { payload }: PayloadAction<number>) => {
            state.results = Array(payload).fill(Result.NoRecord)
        },
        resultChanged: (
            state,
            {
                payload,
            }: PayloadAction<{
                questionSetIndex: number
                questionSetId: string
                result: Result
            }>,
        ) => {
            const { questionSetIndex, questionSetId, result } = payload
            state.results[questionSetIndex] = { questionSetId, result }
        },
    },
})

export const { resultChanged, initResults, chapterUsed } =
    practiceChapterSlice.actions

// selectors
export const selectChapterId = (state: RootState) =>
    state.practiceChapter.chapterId

export default practiceChapterSlice.reducer
