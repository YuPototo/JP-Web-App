import React from 'react'
import MyModal from '../../../components/MyModal'
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
            <div>
                <div>确定重置进度吗?</div>
                <button onClick={onModalClosed}>返回</button>
                <button onClick={handleResetProgress}>确认</button>
            </div>
        </MyModal>
    )
}
