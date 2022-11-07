import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import BookCard from './BookCard'
import { useGetBooksQuery } from '../booksService'
import { cleanCategory, selectBooksByCategory } from '../booksSlice'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/routeBuilder'
import Button from '../../../components/ui/Button'

export default function BookList() {
    useGetBooksQuery()
    const books = useAppSelector(selectBooksByCategory)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleRepick = () => {
        dispatch(cleanCategory())
    }

    return (
        <div className="flex flex-wrap gap-4">
            {books.length > 0 ? (
                books.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => navigate(routes.bookDetail(book.id))}
                    >
                        <BookCard book={book} />
                    </div>
                ))
            ) : (
                <div className="w-full rounded bg-white p-4">
                    <div className="mb-4">该筛选条件内暂无练习</div>
                    <Button outline onClick={handleRepick}>
                        重新选择
                    </Button>
                </div>
            )}
        </div>
    )
}
