import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
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
import useAuthGuard from '../features/user/hooks/useAuthGuard'
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

    const progressInPercent = Math.floor(progress * 100) + '%'

    return (
        <div>
            <h1 className="mb-2 text-xl text-green-700">{notebook.title}</h1>
            {notebook.isDefault || (
                <div className="flex gap-4">
                    <NotebookUpdator notebook={notebook} />
                    <NotebookDeleter notebook={notebook} />
                </div>
            )}

            {isEmptyNotebook && (
                <div className="mt-8">
                    <div className="mb-4">这个笔记本是空的</div>
                    <Button outline onClick={() => navigate(-1)}>
                        返回
                    </Button>
                </div>
            )}

            {notebookDoable && (
                <div className="mt-6">
                    <div className="mb-2">
                        题目数量：{questionSetIds.length}
                    </div>

                    <div className="mb-4">复习进度：{progressInPercent}</div>

                    {notebookProgress > 0 && (
                        <NotebookReseter notebook={notebook} />
                    )}

                    {progress < 1 && (
                        <div className="mt-4">
                            <Button onClick={handleStart}>
                                {notebookProgress > 0 ? '继续' : '开始'}复习
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
