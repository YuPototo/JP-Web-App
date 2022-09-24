const setWorkingBook = (bookId: string) => {
    localStorage.setItem('workingBookId', bookId)
}

const getWorkingBook = () => {
    return localStorage.getItem('workingBookId')
}

const progressStorage = {
    setWorkingBook,
    getWorkingBook,
}

export default progressStorage
