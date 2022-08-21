import { useParams } from 'react-router-dom'
import BookCard from '../features/books/BookCard'
import Content from '../features/content/Content'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectBookById, setCurrentBookId } from '../features/books/booksSlice'
import { useEffect } from 'react'

export default function BookDetail() {
    // todo: remove as
    const { bookId } = useParams() as { bookId: string }
    const dispatch = useAppDispatch()

    const book = useAppSelector(selectBookById(bookId))

    useEffect(() => {
        dispatch(setCurrentBookId(bookId))
    }, [bookId, dispatch])

    return (
        <div>
            <div>
                {book ? (
                    <BookCard book={book} />
                ) : (
                    <div>Store 里找不到 id 为 {bookId} 的 book</div>
                )}
                <Content bookId={bookId} />
            </div>
        </div>
    )
}
