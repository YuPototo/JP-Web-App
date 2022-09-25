import { useNavigate, useParams } from 'react-router-dom'
import BookCard from '../features/books/components/BookCard'
import Content from '../features/books/components/Content'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectBookById, bookViewed } from '../features/books/booksSlice'
import { useEffect, useState } from 'react'
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation,
} from '../features/bookFav/bookFavService'
import { selectIsLogin } from '../features/user/userSlice'
import toast from 'react-hot-toast'
import { routes } from '../routes/routeBuilder'
import { useGetChapterDoneQuery } from '../features/chapterDone/chapterDoneService'
import ResetProgressModal from '../features/chapterDone/DeleteChapterDoneModal'
import { useGetBooksQuery } from '../features/books/booksService'
import { useBookProgress } from '../features/progress/hooks/useWorkingBook'
import { selectHasProgress } from '../features/progress/progressSlice'

export default function BookDetail() {
    const { bookId } = useParams() as { bookId: string }
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(bookViewed(bookId))
    }, [bookId, dispatch])

    return (
        <div>
            <BookCardWrapper bookId={bookId} />
            <WorkingProgress bookId={bookId} />
            <FavButton bookId={bookId} />
            <ResetProgresssButton bookId={bookId} />
            <Content bookId={bookId} />
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
        return <div>获取书籍中...</div>
    }

    return <BookCard book={book} />
}

/**
 * Feature：收藏和取消收藏
 */
function FavButton({ bookId }: { bookId: string }) {
    const naviagte = useNavigate()

    const isLogin = useAppSelector(selectIsLogin)

    const { data: isFav, isLoading } = useCheckBookFavQuery(bookId, {
        skip: !isLogin,
    })

    const [addBookFav, { isLoading: isAdding }] = useAddBookFavMutation()
    const [removeBookFav, { isLoading: isRemoving }] =
        useRemoveBookFavMutation()

    const disableAddFav = isLoading || isAdding || isRemoving

    const isUpdating = isAdding || isRemoving

    const toggleBookFav = async () => {
        if (!isLogin) {
            toast.error('请登录')
            setTimeout(() => {
                naviagte(routes.login())
            }, 2000)
        }

        const mutation = isFav ? removeBookFav : addBookFav
        const toastText = isFav ? '取消收藏成功' : '收藏成功'

        try {
            await mutation(bookId).unwrap()
            toast.success(toastText)
        } catch (err) {
            // handled by middlware
        }
    }

    return (
        <div>
            <button onClick={toggleBookFav} disabled={disableAddFav}>
                {isFav ? '取消收藏' : '收藏'} {isUpdating && '中...'}
            </button>
        </div>
    )
}

/**
 * Feature: 重置 chapter dones
 */
function ResetProgresssButton({ bookId }: { bookId: string }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const isLogin = useAppSelector(selectIsLogin)

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin,
    })

    const hasChapterDones = chaptersDone && chaptersDone.length > 0

    const hasProgress = useAppSelector(selectHasProgress(bookId))

    const showBtn = hasChapterDones || hasProgress

    return (
        <>
            <ResetProgressModal
                bookId={bookId}
                isOpen={isDeleteModalOpen}
                onModalClosed={() => setIsDeleteModalOpen(false)}
            />
            {showBtn && (
                <button onClick={() => setIsDeleteModalOpen(true)}>
                    重置进度
                </button>
            )}
        </>
    )
}

/**
 * Feature: 做题进度
 */
function WorkingProgress({ bookId }: { bookId: string }) {
    const { isDone, questionSetIndex, chapterTitle, sectionTitle } =
        useBookProgress(bookId)

    if (isDone) return <div>做完了！</div>

    return (
        <div className="m-2 bg-red-100 p-2">
            <div>{sectionTitle}</div>
            <div>{chapterTitle}</div>
            {questionSetIndex !== undefined && (
                <div>第{questionSetIndex + 1}题</div>
            )}
        </div>
    )
}
