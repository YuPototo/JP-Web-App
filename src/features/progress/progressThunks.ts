import { AppThunk } from '../../store/store'
import progressStorage from './progressStorage'

export const setProgress = (): AppThunk => (_, getState) => {
    const state = getState()
    const currentBook = state.books.currentBookId

    if (currentBook) {
        progressStorage.setWorkingBook(currentBook)
    } else {
        console.error('Store 里没有 current book id')
    }
}
