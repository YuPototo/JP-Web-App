import React from 'react'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { useAppDispatch } from '../../../store/hooks'
import { resetNotebookProgress } from '../notebookSlice'
import { INotebook } from '../notebookTypes'

type Props = {
    notebook: INotebook
    isOpen: boolean
    onModalClosed: () => void
}

export default function ResetNotebookProgressModal({
    notebook,
    isOpen,
    onModalClosed,
}: Props) {
    const dispatch = useAppDispatch()
    const handleResetProgress = () => {
        dispatch(resetNotebookProgress(notebook.id))
    }

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <>
                <div className="mb-4">确定重置进度吗?</div>
                <div className="flex gap-2">
                    <Button outline color="gray" onClick={onModalClosed}>
                        返回
                    </Button>
                    <Button outline onClick={handleResetProgress}>
                        确认
                    </Button>
                </div>
            </>
        </MyModal>
    )
}
