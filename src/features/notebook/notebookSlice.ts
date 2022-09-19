import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { notebookApi } from './notebookService'
import notebookStorageService from './notebookStorage'

interface NotebookState {
    newNotebook: string | null
    notebookProgress: Record<string, number>
    currentNotebook: string | null
    questionSetIds: string[]
}

const initialState: NotebookState = {
    newNotebook: null,
    notebookProgress: {},
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
        questionSetIdsAdded: (state, action: PayloadAction<string[]>) => {
            state.questionSetIds = action.payload
        },
        notebookProgressUpdated: (
            state,
            action: PayloadAction<{ notebookId: string; index: number }>,
        ) => {
            state.notebookProgress[action.payload.notebookId] =
                action.payload.index
        },
        notebookUsed: (state, action: PayloadAction<string>) => {
            state.currentNotebook = action.payload
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
    notebookUsed,
    questionSetIdsAdded,
} = notebookSlice.actions

export default notebookSlice.reducer

/* selectors */
export const selectNotebokProgress =
    (notebookId: string) => (state: RootState) => {
        const progress = state.notebook.notebookProgress[notebookId]
        return progress ? progress : 0
    }

/* thunks */
export const getNotebookProgress =
    (notebookId: string): AppThunk =>
    (dispatch) => {
        const progress = notebookStorageService.getProgress(notebookId)
        dispatch(notebookProgressUpdated({ notebookId, index: progress }))
    }

export const setNotebookProgress =
    (notebookId: string, index: number): AppThunk =>
    (dispatch) => {
        notebookStorageService.setProgress(notebookId, index)
        dispatch(notebookProgressUpdated({ notebookId, index: 0 }))
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
        }
        dispatch(setNotebookProgress(currentNotebook, index + 1))
    }
