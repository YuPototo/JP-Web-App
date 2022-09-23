import { useGetBookFavsQuery } from '../features/bookFav/bookFavService'
import { useAppSelector } from '../store/hooks'
import { selectBookById } from '../features/books/booksSlice'
import BookCard from '../features/books/components/BookCard'
import { routes } from '../routes/routeBuilder'
import { useNavigate } from 'react-router-dom'
import useAuthGuard from '../features/user/useAuthGuard'

export default function ShelfPage() {
    const navigate = useNavigate()
    const isLogin = useAuthGuard()
    const { data } = useGetBookFavsQuery(undefined, { skip: !isLogin })

    return (
        <div>
            <h1>书架页</h1>
            {data?.map((bookId) => (
                <div
                    key={bookId}
                    onClick={() => navigate(routes.bookDetail(bookId))}
                >
                    <BookWrapper bookId={bookId} />
                </div>
            ))}
        </div>
    )
}

function BookWrapper({ bookId }: { bookId: string }) {
    const book = useAppSelector(selectBookById(bookId))
    if (!book) {
        return <div>错误：找不到练习册 {bookId}</div>
    }
    return <BookCard book={book} />
}
