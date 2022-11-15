import React from 'react'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import NotebookCreator from './NotebookCreator'
import NotebookListInModal from './NotebookListInModal'

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
                <div className="mb-6 text-lg text-green-600">选择笔记本</div>
                <NotebookListInModal
                    questionSetId={questionSetId}
                    onQuestionSetSaved={onModalClosed}
                />

                <div className="mt-6 flex gap-3">
                    <Button outline color="gray" onClick={onModalClosed}>
                        返回
                    </Button>
                    <NotebookCreator />
                </div>
            </div>
        </MyModal>
    )
}
