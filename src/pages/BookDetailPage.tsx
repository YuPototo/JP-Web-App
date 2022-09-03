import { useNavigate, useParams } from 'react-router-dom'
import BookCard from '../features/books/components/BookCard'
import Content from '../features/books/components/Content'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectBookById, setCurrentBookId } from '../features/books/booksSlice'
import { useEffect } from 'react'
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation,
} from '../features/bookFav/bookFavService'
import { selectIsLogin } from '../features/user/userSlice'
import toast from 'react-hot-toast'
import { routeBuilder } from '../routes/routeBuilder'

export default function BookDetail() {
    /** Tech debt
     * * remove as keyword
     */
    const { bookId } = useParams() as { bookId: string }
    const dispatch = useAppDispatch()
    const naviagte = useNavigate()

    const book = useAppSelector(selectBookById(bookId))

    useEffect(() => {
        dispatch(setCurrentBookId(bookId))
    }, [bookId, dispatch])

    const isLogin = useAppSelector(selectIsLogin)

    const { data: isFav, isLoading } = useCheckBookFavQuery(bookId, {
        skip: !isLogin,
    })

    const [addBookFav, { isLoading: isAdding }] = useAddBookFavMutation()
    const [removeBookFav, { isLoading: isRemoving }] =
        useRemoveBookFavMutation()

    const toggleBookFav = async () => {
        if (!isLogin) {
            toast.error('请登录')
            setTimeout(() => {
                naviagte(routeBuilder.login())
            }, 2000)
        }

        const mutation = isFav ? removeBookFav : addBookFav
        const toastText = isFav ? '取消收藏成功' : '收藏成功'

        try {
            await mutation(bookId).unwrap()
            toast.success(toastText)
        } catch (err: any) {
            // todo: use a middleware to handle request error
            toast.error(JSON.stringify(err))
        }
    }

    const disableAddFav = isLoading || isAdding || isRemoving

    const isUpdating = isAdding || isRemoving

    return (
        <div>
            <div>
                {book ? (
                    <BookCard book={book} />
                ) : (
                    <div>Store 里找不到 id 为 {bookId} 的 book</div>
                )}

                <button onClick={toggleBookFav} disabled={disableAddFav}>
                    {isFav ? '取消收藏' : '收藏'} {isUpdating && '中...'}
                </button>
                <Content bookId={bookId} />
            </div>
        </div>
    )
}
