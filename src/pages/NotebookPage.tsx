import React from 'react'
import { useParams } from 'react-router-dom'
import NotebookDeleter from '../features/notebook/components/NotebookDeleter'
import NotebookUpdator from '../features/notebook/components/NotebookUpdator'
import { useGetNotebooksQuery } from '../features/notebook/notebookService'
import useAuthGuard from '../features/user/useAuthGuard'

export default function NotebookPage() {
    const { notebookId } = useParams() as { notebookId: string }

    const isLogin = useAuthGuard()

    const { data: notebooks } = useGetNotebooksQuery(undefined, {
        skip: !isLogin,
    })

    const notebook = notebooks?.find((el) => el.id === notebookId)

    if (!notebook) {
        return <div>加载中...</div>
    }

    return (
        <div>
            <h1>{notebook.title}</h1>
            {notebook.isDefault || (
                <div>
                    <NotebookUpdator notebook={notebook} />
                    <NotebookDeleter notebook={notebook} />
                </div>
            )}
        </div>
    )
}