import { useState } from 'react'
import Button from '../../../components/ui/Button'
import CreateNotebookModal from './CreateNotebookModal'

export default function NotebookCreator() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button outline onClick={() => setShowModal(true)}>
                新建笔记本
            </Button>
            <CreateNotebookModal
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
        </>
    )
}
