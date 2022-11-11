import React, { useState } from 'react'
import DeleteNotebookModal from './DeleteNotebookModal'
import { INotebook } from '../notebookTypes'
import Button from '../../../components/ui/Button'

type Props = {
    notebook: INotebook
}

export default function NotebookDeleter({ notebook }: Props) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-2">
            <DeleteNotebookModal
                notebook={notebook}
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
            <Button outline color="red" onClick={() => setShowModal(true)}>
                删除
            </Button>
        </div>
    )
}
