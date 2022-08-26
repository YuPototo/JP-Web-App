import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from '../booksService'
import { selectBooksByCategory } from '../booksSlice'
import { useNavigate } from 'react-router-dom'

export default function BookList() {
    useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)
    let navigate = useNavigate()

    return (
        <div>
            {books.length > 0 ? (
                books.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => navigate(`books/${book.id}`)}
                    >
                        <BookCard book={book} />
                    </div>
                ))
            ) : (
                <div>No books</div>
            )}
        </div>
    )
}
