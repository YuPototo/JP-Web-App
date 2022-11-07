import { useParams } from 'react-router-dom'
import BookCardTop from '../features/books/components/BookCardTop'
import Content from '../features/books/components/Content'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectBookById, bookViewed } from '../features/books/booksSlice'
import { useEffect } from 'react'

import { useGetBooksQuery } from '../features/books/booksService'
import ResetProgresssButton from '../features/progress/components/ResetProgressButton'

export default function BookDetail() {
    const { bookId } = useParams() as { bookId: string }
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(bookViewed(bookId))
    }, [bookId, dispatch])

    return (
        <div>
            <BookCardWrapper bookId={bookId} />
            <Content bookId={bookId} />
            <div className="flex justify-center py-4">
                <ResetProgresssButton bookId={bookId} />
            </div>
        </div>
    )
}

/**
 * show book card
 */
function BookCardWrapper({ bookId }: { bookId: string }) {
    const book = useAppSelector(selectBookById(bookId))
    useGetBooksQuery(undefined, { skip: !!book })

    if (!book) {
        return <div>正在获取数据...</div>
    }

    return <BookCardTop book={book} />
}
