import React, { useState } from 'react'
import NodebookCreateModal from './NodebookCreateModal'

export default function NotebookCreateWrapper() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="my-4">
            <button onClick={() => setShowModal(true)}>创建笔记本</button>
            <NodebookCreateModal
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
            />
        </div>
    )
}
