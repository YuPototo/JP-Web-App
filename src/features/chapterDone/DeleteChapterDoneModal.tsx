import React from 'react'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { useDeleteChapterDoneMutation } from './chapterDoneService'

const customStyles = {
    content: {
        top: '20%',
        left: '25%',
        right: '25%',
        bottom: 'auto',
        padding: '25px',
    },
}

interface Props {
    bookId: string
    isOpen: boolean
    closeModal: () => void
}

export default function DeleteChapterDoneModal({
    bookId,
    isOpen,
    closeModal,
}: Props) {
    const [removeChapterDone, { isLoading, isSuccess }] =
        useDeleteChapterDoneMutation()

    const handleConfirm = async () => {
        try {
            await removeChapterDone(bookId).unwrap()
            toast.success('已重置进度')
            setTimeout(() => {
                closeModal()
            }, 1000)
        } catch (err) {
            // handled by middleware
        }
    }

    const disableConfirmBtn = isLoading || isSuccess

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
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
                <button className="btn btn-info--outline" onClick={closeModal}>
                    返回
                </button>
            </div>
        </Modal>
    )
}
