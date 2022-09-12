import React from 'react'
import toast from 'react-hot-toast'
import MyModal from '../../components/MyModal'
import { useDeleteChapterDoneMutation } from './chapterDoneService'

interface Props {
    bookId: string
    isOpen: boolean
    onModalClosed: () => void
}

export default function DeleteChapterDoneModal({
    bookId,
    isOpen,
    onModalClosed,
}: Props) {
    const [removeChapterDone, { isLoading, isSuccess }] =
        useDeleteChapterDoneMutation()

    const handleConfirm = async () => {
        try {
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
            <h2 className="mb-3 text-lg text-red-600">重置做题记录</h2>
            <div className="mb-3 ml-2">
                <p className="">删除这个习题集里的章节完成记录。</p>
                <p className="">确定要删除吗？</p>
            </div>

            <div className="flex gap-4">
                <button
                    className="btn btn-warning"
                    onClick={handleConfirm}
                    disabled={disableConfirmBtn}
                >
                    确认
                </button>
                <button
                    className="btn btn-info--outline"
                    onClick={onModalClosed}
                >
                    返回
                </button>
            </div>
        </MyModal>
    )
}
