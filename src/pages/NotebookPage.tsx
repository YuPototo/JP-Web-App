import { useEffect } from 'react'
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
    selectNotebokProgressIndex,
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
    const notebookProgress = useAppSelector(selectNotebokProgressIndex)
    const nextQuestionSetId = questionSetIds?.[notebookProgress]

    if (!notebook) {
        return <div>加载中...</div>
    }

    const isEmptyNotebook = questionSetIds?.length === 0

    const notebookDoable = !isEmptyNotebook && questionSetIds !== undefined

    const progress = questionSetIds
        ? notebookProgress / questionSetIds.length
        : 0

    const handleStart = () => {
        if (nextQuestionSetId !== undefined) {
            navigate(routes.practiceNotebook(notebookId, nextQuestionSetId))
        }
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

                    <div>复习进度：{progress}</div>

                    {progress < 1 && (
                        <div>
                            <button onClick={handleStart}>
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
