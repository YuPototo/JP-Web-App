import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chapterApi, selectChapterQuetionSetIds } from './chapterSerivce'
import { PracticeChapterState } from './practiceChapterTypes'
import type { AppThunk, RootState } from '../../store/store'
import { selectIsLogin } from '../user/userSlice'
import { chapterDoneApi } from '../chapterDone/chapterDoneService'

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
            }>,
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
    async (dispatch, getState) => {
        const result = isRight ? Result.Right : Result.Wrong

        // 获取当前 questionSet 的 index
        // 一个方法是：获取 api query 里的 questionSet Array，然后获取其 index
        const state = getState()
        const chapterId = selectChapterId(state)
        if (!chapterId) {
            console.error('chapterId is null')
            return
        }

        let questionSetIds =
            selectChapterQuetionSetIds(chapterId)(state).data?.questionSets

        if (!questionSetIds) {
            // 需要在下面这行使用 await，不然 query 会处于 pending 状态
            await dispatch(chapterApi.endpoints.getChapter.initiate(chapterId))
            const newState = getState()
            questionSetIds =
                selectChapterQuetionSetIds(chapterId)(newState).data
                    ?.questionSets

            if (!questionSetIds) {
                console.error('doneInChapter: 无法重新获取 questionSetIds')
                return
            }
        }

        const questionSetIndex = questionSetIds.indexOf(questionSetId)
        dispatch(setResult({ questionSetIndex, questionSetId, result }))

        /* 如果是最后一个 questionSet，就发送 chapterDone 的请求 */
        const isLogin = selectIsLogin(state)
        if (!isLogin) return
        if (questionSetIndex === questionSetIds.length - 1) {
            const bookId = state.books.currentBookId
            if (!bookId) {
                console.error('doneInChapter: bookId is null')
            } else {
                dispatch(
                    chapterDoneApi.endpoints.addChapterDone.initiate({
                        bookId,
                        chapterId,
                    }),
                )
            }
        }
    }

export default practiceChapterSlice.reducer
