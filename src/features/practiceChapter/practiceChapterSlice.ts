import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from '../../store/store'

export enum Result {
    Right,
    Wrong,
    NoRecord,
}

export interface QuestionSetResult {
    questionSetId: string
    result: Result
}

export interface PracticeChapterState {
    results: QuestionSetResult[]
}

const initialState: PracticeChapterState = {
    results: [],
}

export const practiceChapterSlice = createSlice({
    name: 'practiceChapter',
    initialState,
    reducers: {
        pushResult: (
            state,
            {
                payload,
            }: PayloadAction<{
                questionSetId: string
                result: Result
            }>
        ) => {
            const { questionSetId, result } = payload
            state.results.push({ questionSetId, result })
        },
    },
})

export const { pushResult } = practiceChapterSlice.actions

// thunks
export const doneInChapter =
    (questionSetId: string, isRight: boolean): AppThunk =>
    (dispatch) => {
        const result = isRight ? Result.Right : Result.Wrong
        dispatch(pushResult({ questionSetId, result }))
    }

export default practiceChapterSlice.reducer
