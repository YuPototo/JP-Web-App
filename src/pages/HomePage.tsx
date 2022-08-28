import React from 'react'
import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'
import TestWeChatLogin from '../features/user/TestWeChatLogin'

export default function home() {
    return (
        <>
            <TestWeChatLogin />

            <CategoryNav />
            <BookList />
        </>
    )
}
