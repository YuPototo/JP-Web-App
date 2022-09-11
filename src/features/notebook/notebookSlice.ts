import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notebookApi } from './notebookService'

interface NotebookState {
    newNotebook: string | null
}

const initialState: NotebookState = {
    newNotebook: null,
}

export const notebookSlice = createSlice({
    name: 'notebook',
    initialState,
    reducers: {
        notebookCreated: (state, action: PayloadAction<string>) => {
            state.newNotebook = action.payload
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

export const { notebookCreated } = notebookSlice.actions
export default notebookSlice.reducer
