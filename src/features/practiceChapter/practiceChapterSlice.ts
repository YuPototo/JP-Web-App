import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectChapterQuetionSetIds } from './chapterSerivce'
import { PracticeChapterState } from './practiceChapterTypes'
import type { AppThunk, RootState } from '../../store/store'

export enum Result {
    Right,
    Wrong,
    NoRecord,
}

const initialState: PracticeChapterState = {
    chapterId: null,
    questionSetIndex: 0,
    results: [],
}

export const practiceChapterSlice = createSlice({
    name: 'practiceChapter',
    initialState,
    reducers: {
        setQuestionSetIndex: (state, { payload }: PayloadAction<number>) => {
            state.questionSetIndex = payload
        },
        incQuestionSetIndex: (state, { payload }: PayloadAction<number>) => {
            state.questionSetIndex += payload
        },
        setChapterId: (state, { payload }: PayloadAction<string>) => {
            state.chapterId = payload
        },
        initResults: (state, { payload }: PayloadAction<number>) => {
            state.results = Array(payload).fill(Result.NoRecord)
        },
        setResult: (
            state,
            {
                payload,
            }: PayloadAction<{
                questionSetIndex: number
                questionSetId: string
                result: Result
            }>
        ) => {
            const { questionSetIndex, questionSetId, result } = payload
            state.results[questionSetIndex] = { questionSetId, result }
        },
    },
})

export const {
    setResult,
    initResults,
    setChapterId,
    setQuestionSetIndex,
    incQuestionSetIndex,
} = practiceChapterSlice.actions

// selectors
export const selectChapterId = (state: RootState) =>
    state.practiceChapter.chapterId

// thunks
export const doneInChapter =
    (questionSetId: string, isRight: boolean): AppThunk =>
    (dispatch, getState) => {
        const result = isRight ? Result.Right : Result.Wrong

        // 获取当前 questionSet 的 index
        // 一个方法是：获取 api query 里的 questionSet Array，然后获取其 index
        const state = getState()
        const chapterId = selectChapterId(state)
        if (!chapterId) {
            console.error('chapterId is null')
            return
        }

        const questionSetIds =
            selectChapterQuetionSetIds(chapterId)(state).data?.questionSets

        if (!questionSetIds) {
            console.error('questionSetIds is null')
            return
        }

        const questionSetIndex = questionSetIds.indexOf(questionSetId)

        dispatch(setResult({ questionSetIndex, questionSetId, result }))
    }

export default practiceChapterSlice.reducer
