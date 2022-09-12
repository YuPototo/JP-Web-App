import React from 'react'
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import { useDeleteNotebookMutation } from './notebookService'
import { INotebook } from './notebookTypes'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routeBuilder'
import MyModal from '../../components/MyModal'

type Props = {
    notebook: INotebook
    isOpen: boolean
    onModalClosed: () => void
}

export default function DeleteNotebookModal({
    notebook,
    isOpen,
    onModalClosed,
}: Props) {
    const navigate = useNavigate()
    const [deleteNotebook, { isLoading }] = useDeleteNotebookMutation()

    const handleDelete = async () => {
        try {
            await deleteNotebook(notebook.id).unwrap()
            toast.success('笔记本删除成功')
            navigate(routes.notebookList())
        } catch (err) {
            // 在 middleware 处理了
        }
    }
    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <div>删除笔记本会删除其中收藏的题目</div>
            <div>确认删除笔记本{notebook.title}吗？</div>
            <button className="m-2" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? <Spinner /> : '删除'}
            </button>
            <button className="m-2" onClick={onModalClosed}>
                返回
            </button>
        </MyModal>
    )
}
