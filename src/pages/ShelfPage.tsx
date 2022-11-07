import { useGetBookFavsQuery } from '../features/bookFav/bookFavService'
import { useAppSelector } from '../store/hooks'
import { selectBookById } from '../features/books/booksSlice'
import BookCard from '../features/books/components/BookCard'
import { routes } from '../routes/routeBuilder'
import { useNavigate } from 'react-router-dom'
import useAuthGuard from '../features/user/hooks/useAuthGuard'

export default function ShelfPage() {
    const navigate = useNavigate()
    const isLogin = useAuthGuard()
    const { data } = useGetBookFavsQuery(undefined, { skip: !isLogin })

    return (
        <div>
            <h1 className="mb-4 text-xl text-green-700">我的书架</h1>
            <div className="flex flex-wrap gap-8">
                {data?.map((bookId) => (
                    <div
                        key={bookId}
                        onClick={() => navigate(routes.bookDetail(bookId))}
                        className="hover:cursor-pointer"
                    >
                        <BookWrapper bookId={bookId} />
                    </div>
                ))}
            </div>
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
