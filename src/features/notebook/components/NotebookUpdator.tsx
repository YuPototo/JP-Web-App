import React, { useState } from 'react'
import Button from '../../../components/ui/Button'
import { INotebook } from '../notebookTypes'
import UpdateNotebookModal from './UpdateNotebookModal'

type Props = {
    notebook: INotebook
}

export default function NotebookUpdator({ notebook }: Props) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-2">
            <UpdateNotebookModal
                notebook={notebook}
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
            <Button outline color="gray" onClick={() => setShowModal(true)}>
                改名
            </Button>
        </div>
    )
}
