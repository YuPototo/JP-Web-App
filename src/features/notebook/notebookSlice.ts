import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { notebookApi } from './notebookService'
import notebookStorageService from './notebookStorage'

type ProgressType =
    | string // questionSet 的 id
    | 0 // 没有进度
    | 1 // 已完成

interface NotebookState {
    newNotebook: string | null
    currentNotebookProgress: ProgressType
    currentNotebook: string | null
    questionSetIds: string[]
}

const initialState: NotebookState = {
    newNotebook: null,
    currentNotebookProgress: 0,
    currentNotebook: null,
    questionSetIds: [],
}

export const notebookSlice = createSlice({
    name: 'notebook',
    initialState,
    reducers: {
        notebookCreated: (state, action: PayloadAction<string>) => {
            state.newNotebook = action.payload
        },
        questionSetIdsAdded: (state, { payload }: PayloadAction<string[]>) => {
            // 只有在没有questionSetIds的时候才允许添加
            // 这里涉及一个 edge case：做题过程中不允许改变questionSetIds
            if (state.questionSetIds.length === 0) {
                state.questionSetIds = payload
            }
        },
        notebookProgressUpdated: (
            state,
            { payload }: PayloadAction<string | 0 | 1>,
        ) => {
            state.currentNotebookProgress = payload
        },
        noteBookPracticeStarted: (state, action: PayloadAction<string>) => {
            state.currentNotebook = action.payload
            state.questionSetIds = []
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            notebookApi.endpoints.createNotebook.matchFulfilled,
            (state, { payload: notebook }) => {
                state.newNotebook = notebook.id
            },
        )
    },
})

export const {
    notebookCreated,
    notebookProgressUpdated,
    questionSetIdsAdded,
    noteBookPracticeStarted,
} = notebookSlice.actions

export default notebookSlice.reducer

/* selectors */

/**
 * 笔记本进度对应笔记本内的第几题
 */
export const selectNotebokProgressIndex = (state: RootState): number => {
    const { currentNotebookProgress, questionSetIds } = state.notebook
    if (!currentNotebookProgress) {
        return 0
    }

    if (currentNotebookProgress === 1) {
        return questionSetIds.length
    }

    const index = questionSetIds.indexOf(currentNotebookProgress)
    return index === -1 ? 0 : index
}

/* thunks */
export const getNotebookProgress =
    (notebookId: string): AppThunk =>
    (dispatch) => {
        const questionSetId = notebookStorageService.getProgress(notebookId)
        const payload = questionSetId ? questionSetId : 0
        dispatch(notebookProgressUpdated(payload as ProgressType))
    }

export const setNotebookProgress =
    (notebookId: string, progress: string | 0 | 1): AppThunk =>
    (dispatch) => {
        notebookStorageService.setProgress(notebookId, progress)
        dispatch(notebookProgressUpdated(progress))
    }

export const resetNotebookProgress =
    (notebookId: string): AppThunk =>
    (dispatch) => {
        notebookStorageService.resetProgress(notebookId)
        dispatch(notebookProgressUpdated(0))
    }

export const finishNotebookQuestionSet =
    (questionSetId: string): AppThunk =>
    (dispatch, getState) => {
        const state = getState()
        const currentNotebook = state.notebook.currentNotebook
        if (!currentNotebook) {
            console.error('找不到 current notebook')
            return
        }

        const questionSetIds = state.notebook.questionSetIds

        const index = questionSetIds.indexOf(questionSetId)
        if (index === -1) {
            console.error(
                `在 state.notebook.questionSetIds 里找不到 questionSetId ${questionSetId}`,
            )
            return
        }

        if (index === questionSetIds.length - 1) {
            dispatch(setNotebookProgress(currentNotebook, 1))
            return
        }

        const nextQuestionSetId = questionSetIds[index + 1]
        if (nextQuestionSetId) {
            dispatch(setNotebookProgress(currentNotebook, nextQuestionSetId))
        }
    }
