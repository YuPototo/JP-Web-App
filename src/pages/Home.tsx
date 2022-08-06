import React from 'react'
import BookList from '../features/books/BookList'
import CategoryNav from '../features/books/Category'

export default function home() {
    return (
        <>
            <CategoryNav />
            <BookList />
        </>
    )
}
