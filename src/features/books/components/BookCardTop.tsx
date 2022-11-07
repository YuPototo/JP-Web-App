import React from 'react'
import Button from '../../../components/ui/Button'
import { IBook } from '../booksTypes'
import { useNavigate } from 'react-router-dom'
import {
    useAddBookFavMutation,
    useCheckBookFavQuery,
    useRemoveBookFavMutation,
} from '../../../features/bookFav/bookFavService'
import toast from 'react-hot-toast'
import { routes } from '../../../routes/routeBuilder'
import { useAppSelector } from '../../../store/hooks'
import { selectIsLogin } from '../../user/userSlice'
import { useBookProgress } from '../../progress/hooks/useWorkingBook'
import ResetProgressButton from '../../progress/components/ResetProgressButton'
import { selectFirstChapterId } from '../booksSlice'

type Props = { book: IBook }

export default function BookCardTop({ book }: Props) {
    return (
        <div className="flex h-44 w-full gap-4 rounded bg-gray-800 p-2 hover:shadow-md">
            <div className="ml-4 h-full rounded">
                <img className="h-full rounded" alt="封面" src={book.cover} />
            </div>
            <div className="relative flex-grow">
                <div className="text-xl text-white">{book.title}</div>
                <div className="text-white">{book.desc}</div>
                <div className="absolute bottom-2 flex gap-4">
                    <StartPracticeButton bookId={book.id} />
                    <FavButton bookId={book.id} />
                </div>
            </div>
        </div>
    )
}

function StartPracticeButton({ bookId }: { bookId: string }) {
    const navigate = useNavigate()

    const progress = useBookProgress(bookId)
    const firstChapterId = useAppSelector(selectFirstChapterId)

    if (progress.isDone) {
        // 这个地方有 UI 问题，不处理了
        return (
            <div>
                <div className="text-white">已经完成所有练习</div>
                <ResetProgressButton bookId={bookId} />
            </div>
        )
    }
    const hasProgress = progress.chapterId !== undefined

    const btnText = hasProgress ? '继续练习' : '开始练习'

    const toPractice = () => {
        const startingChapterId = progress.chapterId ?? firstChapterId

        const firstQuestionSetIndex = progress.questionSetIndex ?? 0

        if (startingChapterId) {
            navigate(
                routes.practiceChapter(
                    startingChapterId,
                    firstQuestionSetIndex,
                ),
            )
        } else {
            console.error('找不到 startingChapterId')
        }
    }

    return <Button onClick={toPractice}>{btnText}</Button>
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
        <Button outline onClick={toggleBookFav} disabled={disableAddFav}>
            {isFav ? '取消收藏' : '收藏'} {isUpdating && '中...'}
        </Button>
    )
}
