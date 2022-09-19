import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NotebookDeleter from '../features/notebook/components/NotebookDeleter'
import NotebookReseter from '../features/notebook/components/NotebookReseter'
import NotebookUpdator from '../features/notebook/components/NotebookUpdator'
import {
    useGetNotebookContentQuery,
    useGetNotebooksQuery,
} from '../features/notebook/notebookService'
import {
    getNotebookProgress,
    selectNotebokProgress,
} from '../features/notebook/notebookSlice'
import useAuthGuard from '../features/user/useAuthGuard'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function NotebookPage() {
    const { notebookId } = useParams() as { notebookId: string }
    const dispatch = useAppDispatch()
    const isLogin = useAuthGuard()
    const navigate = useNavigate()

    const { data: notebooks } = useGetNotebooksQuery(undefined, {
        skip: !isLogin,
    })

    const { data: questionSetIds } = useGetNotebookContentQuery(notebookId, {
        skip: !isLogin,
    })

    useEffect(() => {
        dispatch(getNotebookProgress(notebookId))
    }, [notebookId, dispatch])

    const notebook = notebooks?.find((el) => el.id === notebookId)
    const notebookProgress = useAppSelector(selectNotebokProgress(notebookId))

    if (!notebook) {
        return <div>加载中...</div>
    }

    const isEmptyNotebook = questionSetIds?.length === 0

    const notebookDoable = !isEmptyNotebook && questionSetIds !== undefined

    const hasFinished = questionSetIds
        ? notebookProgress >= questionSetIds?.length
        : false

    const studyProgressText = hasFinished
        ? '已完成'
        : `第${notebookProgress + 1}题`

    return (
        <div>
            <h1>{notebook.title}</h1>
            {notebook.isDefault || (
                <div>
                    <NotebookUpdator notebook={notebook} />
                    <NotebookDeleter notebook={notebook} />
                </div>
            )}

            {isEmptyNotebook && (
                <div>
                    <div>这个笔记本是空的</div>
                    <button onClick={() => navigate(routes.home())}>
                        去练习
                    </button>
                </div>
            )}

            {notebookDoable && (
                <>
                    <div>收藏了{questionSetIds.length}题</div>

                    <div>复习进度：{studyProgressText}</div>

                    {!hasFinished && (
                        <div>
                            <button>
                                {notebookProgress > 0 ? '继续' : '开始'}复习
                            </button>
                        </div>
                    )}

                    {notebookProgress > 0 && (
                        <div>
                            <NotebookReseter notebook={notebook} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
