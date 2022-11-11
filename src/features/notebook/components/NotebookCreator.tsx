import { useState } from 'react'
import Button from '../../../components/ui/Button'
import CreateNotebookModal from './CreateNotebookModal'

export default function NotebookCreator() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-4">
            <Button outline onClick={() => setShowModal(true)}>
                创建笔记本
            </Button>
            <CreateNotebookModal
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
        </div>
    )
}
