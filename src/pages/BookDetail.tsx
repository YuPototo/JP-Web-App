import { useParams } from 'react-router-dom'
import BookCard from '../features/books/BookCard'
import Content from '../features/content/Content'
import { useAppSelector } from '../store/hooks'
import { selectBookById } from '../features/books/booksSlice'

export default function BookDetail() {
    const { bookId } = useParams() as { bookId: string }

    const book = useAppSelector(selectBookById(bookId))

    return (
        <div>
            <div>
                {book && <BookCard book={book} />}
                <Content bookId={bookId} />
            </div>
        </div>
    )
}
