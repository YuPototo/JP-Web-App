import { AppThunk } from '../../store/store'
import progressStorage from './progressStorage'
import { selectNextQuestionSetProgress } from './progressSlice'

export const setProgress = (): AppThunk => (_, getState) => {
    const state = getState()
    const currentBook = state.books.currentBookId

    if (currentBook) {
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
    progressStorage.setProgressDetail(currentBook, progressDetail)
}
