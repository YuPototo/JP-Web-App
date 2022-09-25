import { AppThunk } from '../../store/store'
import progressStorage from './progressStorage'
import {
    progressChanged,
    selectNextQuestionSetProgress,
    workingBookChanged,
} from './progressSlice'

export const setProgress = (): AppThunk => (dispatch, getState) => {
    const state = getState()
    const currentBook = state.books.currentBookId

    if (currentBook) {
        dispatch(workingBookChanged(currentBook))
        progressStorage.setWorkingBook(currentBook)
    } else {
        console.error('Store 里没有 current book id')
        return
    }

    const progressDetail = selectNextQuestionSetProgress(state)
    if (!progressDetail) {
        console.error('fail to find next question set progress')
        return
    }
    dispatch(progressChanged({ bookId: currentBook, progress: progressDetail }))
    progressStorage.setProgressDetail(currentBook, progressDetail)
}

export const getProgressByBookId =
    (bookId: string): AppThunk =>
    (dispatch) => {
        const progressDetail = progressStorage.getProgressDetail(bookId)

        if (progressDetail) {
            dispatch(progressChanged({ bookId, progress: progressDetail }))
        }
    }

/**
 * 获取上次做的题目的 progress
 */
export const getWorkingProgress = (): AppThunk => (dispatch) => {
    const bookId = progressStorage.getWorkingBook()
    if (bookId) {
        dispatch(workingBookChanged(bookId))
        dispatch(getProgressByBookId(bookId))
    }
}
