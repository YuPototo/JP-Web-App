import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { splitApi } from './query/splitApi'
import { authRejectionMiddleware } from './middleware/authRejectionMiddleware'
import { queryErrorMiddleware } from './middleware/queryErrorMiddleware'

import booksReducer from '../features/books/booksSlice'
import questionSetReducer from '../features/questionSet/questionSetSlice'
import practiceChapterReducer from '../features/practiceChapter/practiceChapterSlice'
import userReducer from '../features/user/userSlice'

import listenerMiddleware from './listenerMiddleware'

export const rootReducer = combineReducers({
    [splitApi.reducerPath]: splitApi.reducer,
    books: booksReducer,
    practiceChapter: practiceChapterReducer,
    questionSet: questionSetReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(
                splitApi.middleware,
                authRejectionMiddleware,
                queryErrorMiddleware,
            ),
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer> //https://github.com/reduxjs/redux/issues/4267

// export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
