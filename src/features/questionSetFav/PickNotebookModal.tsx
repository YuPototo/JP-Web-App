import React from 'react'
import MyModal from '../../components/MyModal'
import NotebookCreator from '../notebook/components/NotebookCreator'
import NotebookListInModal from '../notebook/components/NotebookListInModal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
    questionSetId: string
}

export default function PickNotebookModal({
    isOpen,
    onModalClosed,
    questionSetId,
}: Props) {
    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed} bottom="10px">
            <div className="max-h-[calc(100vh-300px)] w-96 p-4">
                <NotebookListInModal
                    questionSetId={questionSetId}
                    onQuestionSetSaved={onModalClosed}
                />

                <div>
                    <NotebookCreator />
                    <button onClick={onModalClosed}>返回</button>
                </div>
            </div>
        </MyModal>
    )
}
