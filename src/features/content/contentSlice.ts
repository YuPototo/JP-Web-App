import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from '../../store/store'

export interface ContentSlice {
    name: 1
}

const initialState: ContentSlice = {
    name: 1,
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
})

export const {} = contentSlice.actions

// selectors

export default contentSlice.reducer
