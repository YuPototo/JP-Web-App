import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { splitApi } from './query/splitApi'

import bookListReducer from '../features/books/booksSlice'
import questionSetReducer from '../features/questionSet/questionSetSlice'
import practiceChapterReducer from '../features/practiceChapter/practiceChapterSlice'

import listenerMiddleware from './listenerMiddleware'

const rootReducer = combineReducers({
    [splitApi.reducerPath]: splitApi.reducer,
    bookList: bookListReducer,
    practiceChapter: practiceChapterReducer,
    questionSet: questionSetReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(splitApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
