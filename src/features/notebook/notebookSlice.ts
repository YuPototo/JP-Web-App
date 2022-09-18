import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { notebookApi } from './notebookService'
import notebookStorageService from './notebookStorage'

interface NotebookState {
    newNotebook: string | null
    notebookProgress: Record<string, number>
}

const initialState: NotebookState = {
    newNotebook: null,
    notebookProgress: {},
}

export const notebookSlice = createSlice({
    name: 'notebook',
    initialState,
    reducers: {
        notebookCreated: (state, action: PayloadAction<string>) => {
            state.newNotebook = action.payload
        },
        notebookProgressUpdated: (
            state,
            action: PayloadAction<{ notebookId: string; index: number }>,
        ) => {
            state.notebookProgress[action.payload.notebookId] =
                action.payload.index
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

export const { notebookCreated, notebookProgressUpdated } =
    notebookSlice.actions

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
