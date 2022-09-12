import React, { useState } from 'react'
import CreateNotebookModal from './CreateNotebookModal'

export default function NotebookCreator() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-4">
            <button onClick={() => setShowModal(true)}>创建笔记本</button>
            <CreateNotebookModal
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
        </div>
    )
}
