import React from 'react'
import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'

export default function home() {
    return (
        <>
            <CategoryNav />
            <BookList />
        </>
    )
}
