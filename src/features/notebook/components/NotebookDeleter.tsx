import React, { useState } from 'react'
import DeleteNotebookModal from './DeleteNotebookModal'
import { INotebook } from '../notebookTypes'

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
            <button onClick={() => setShowModal(true)}>删除</button>
        </div>
    )
}
