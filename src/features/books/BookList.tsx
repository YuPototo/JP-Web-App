import React from 'react'
import { useAppSelector } from '../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from './booksService'
import { selectBooksByCategory } from './booksSlice'

export default function BookList() {
    useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)

    return (
        <div>
            <h1>book list</h1>
            {books.length > 0 ? (
                books.map((book, index) => <BookCard key={index} book={book} />)
            ) : (
                <div>No books</div>
            )}
        </div>
    )
}
