import React from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../components/MyModal'
import Button from '../../components/ui/Button'
import { useAppDispatch } from '../../store/hooks'
import { resetProgress } from '../progress/progressThunks'
import { useDeleteChapterDoneMutation } from './chapterDoneService'

interface Props {
    bookId: string
    isOpen: boolean
    onModalClosed: () => void
}

export default function ResetProgressModal({
    bookId,
    isOpen,
    onModalClosed,
}: Props) {
    const dispatch = useAppDispatch()
    const [removeChapterDone, { isLoading, isSuccess }] =
        useDeleteChapterDoneMutation()

    const handleConfirm = async () => {
        try {
            dispatch(resetProgress(bookId))
            await removeChapterDone(bookId).unwrap()
            toast.success('已重置进度')
            setTimeout(() => {
                onModalClosed()
            }, 1000)
        } catch (err) {
            // handled by middleware
        }
    }

    const disableConfirmBtn = isLoading || isSuccess

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <h2 className="mb-3 text-lg text-red-600">重置进度</h2>
            <div className="mb-3 ml-2">
                <p className="">删除本练习册内的做题记录。确定吗？</p>
            </div>

            <div className="flex gap-4">
                <Button
                    color="red"
                    onClick={handleConfirm}
                    disabled={disableConfirmBtn}
                >
                    确认
                </Button>
                <Button outline color="gray" onClick={onModalClosed}>
                    返回
                </Button>
            </div>
        </MyModal>
    )
}
