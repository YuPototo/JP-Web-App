import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import progressStorage from './progressStorage'
import { selectBookById } from '../books/booksSlice'
import BookCard from '../books/components/BookCard'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routeBuilder'

export default function WorkingBook(): JSX.Element {
    const navigate = useNavigate()
    const book = useWorkingBook()

    if (!book) return <></>

    return (
        <div
            className="mb-4 hover:cursor-pointer"
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <div>working book</div>
            <BookCard book={book} />
        </div>
    )
}

function useWorkingBook() {
    const [workingBookId, setWorkingBookId] = useState<string | undefined>()

    useEffect(() => {
        const bookId = progressStorage.getWorkingBook()
        setWorkingBookId(bookId ? bookId : undefined)
    }, [])

    const book = useAppSelector(selectBookById(workingBookId))

    return book
}
