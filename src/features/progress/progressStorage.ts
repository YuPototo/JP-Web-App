import { ProgressDetail } from './progressSlice'

const setWorkingBook = (bookId: string) => {
    localStorage.setItem('workingBookId', bookId)
}

const getWorkingBook = () => {
    return localStorage.getItem('workingBookId')
}

const getProgressDetail = (
    bookId: string,
): ProgressDetail | undefined | { isDone: true } => {
    const value = localStorage.getItem(`bookProgress_${bookId}`)
    if (value) {
        return JSON.parse(value)
    }
}

const setProgressDetail = (
    bookId: string,
    progressDetail: ProgressDetail | 1,
) => {
    if (progressDetail === 1) {
        localStorage.setItem(
            `bookProgress_${bookId}`,
            JSON.stringify({ isDone: true }),
        )
    } else {
        localStorage.setItem(
            `bookProgress_${bookId}`,
            JSON.stringify(progressDetail),
        )
    }
}

const progressStorage = {
    setWorkingBook,
    getWorkingBook,
    getProgressDetail,
    setProgressDetail,
}

export default progressStorage
