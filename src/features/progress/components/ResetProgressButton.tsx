import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { useAppSelector } from '../../../store/hooks'
import { useGetChapterDoneQuery } from '../../chapterDone/chapterDoneService'
import ResetProgressModal from '../../chapterDone/DeleteChapterDoneModal'
import { selectIsLogin } from '../../user/userSlice'
import { selectHasProgress } from '../progressSlice'

export default function ResetProgresssButton({ bookId }: { bookId: string }) {
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
                <Button
                    outline
                    color="gray"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    重置进度
                </Button>
            )}
        </>
    )
}
