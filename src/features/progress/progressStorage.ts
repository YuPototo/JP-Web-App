import { AllProgressType } from './progressSlice'

const setWorkingBook = (bookId: string) => {
    localStorage.setItem('workingBookId', bookId)
}

const getWorkingBook = () => {
    return localStorage.getItem('workingBookId')
}

const getProgressDetail = (bookId: string): AllProgressType | undefined => {
    const value = localStorage.getItem(`bookProgress_${bookId}`)
    if (value) {
        return JSON.parse(value)
    }
}

const setProgressDetail = (bookId: string, progressDetail: AllProgressType) => {
    localStorage.setItem(
        `bookProgress_${bookId}`,
        JSON.stringify(progressDetail),
    )
}

const progressStorage = {
    setWorkingBook,
    getWorkingBook,
    getProgressDetail,
    setProgressDetail,
}

export default progressStorage
