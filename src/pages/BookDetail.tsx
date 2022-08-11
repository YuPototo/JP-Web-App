import { useParams } from 'react-router-dom'
import BookCard from '../features/books/BookCard'
import Content from '../features/content/Content'
import { useAppSelector } from '../store/hooks'
import { selectBookById } from '../features/books/booksSlice'

export default function BookDetail() {
    const { bookId } = useParams()

    const book = useAppSelector(selectBookById(bookId))

    if (!bookId) {
        return <div>bookId 为空</div>
    }

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
