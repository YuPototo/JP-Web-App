import React, { useState } from 'react'
import Button from '../../../components/ui/Button'
import { INotebook } from '../notebookTypes'
import ResetNotebookProgressModal from './ResetNotebookProgressModal'

type Props = {
    notebook: INotebook
}

export default function NotebookReseter({ notebook }: Props) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-2">
            <ResetNotebookProgressModal
                notebook={notebook}
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
            <Button color="gray" outline onClick={() => setShowModal(true)}>
                重置进度
            </Button>
        </div>
    )
}
