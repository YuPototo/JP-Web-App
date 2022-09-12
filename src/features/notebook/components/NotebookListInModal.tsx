import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../../../components/Spinner'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { updateQuestionSetFav } from '../../questionSet/questionSetService'
import { useSaveQuestionSetMutation } from '../../questionSetFav/questionSetFavService'
import useAuthGuard from '../../user/useAuthGuard'
import { useGetNotebooksQuery } from '../notebookService'
import { INotebook } from '../notebookTypes'
import { useOrderNotebooks } from '../useOrderNotebooks'

interface Props {
    questionSetId: string
    onQuestionSetSaved: () => void
}

export default function NotebookListInModal({
    questionSetId,
    onQuestionSetSaved,
}: Props) {
    const isLogin = useAuthGuard()

    const { data, isLoading } = useGetNotebooksQuery(undefined, {
        skip: !isLogin,
    })

    return (
        <div>
            {isLoading && <div>加载中...</div>}
            {data && (
                <Notebooks
                    notebooks={data}
                    questionSetId={questionSetId}
                    onQuestionSetSaved={onQuestionSetSaved}
                />
            )}
        </div>
    )
}

function Notebooks({
    notebooks,
    questionSetId,
    onQuestionSetSaved,
}: {
    notebooks: INotebook[]
    questionSetId: string
    onQuestionSetSaved: () => void
}) {
    const [notebookSaving, setNotebookSaving] = useState('')
    const reordered = useOrderNotebooks(notebooks)
    const newNotebookId = useAppSelector((state) => state.notebook.newNotebook)

    const dispatch = useAppDispatch()

    const [saveQuestionSet, { isLoading }] = useSaveQuestionSetMutation()
    const handleSavQuestionSet = async (notebookId: string) => {
        if (isLoading) {
            return
        }

        try {
            setNotebookSaving(notebookId)
            await saveQuestionSet({ questionSetId, notebookId }).unwrap()
            toast.success('已收藏')
            dispatch(updateQuestionSetFav(questionSetId, true))
            onQuestionSetSaved()
        } catch (err) {
            toast.error('保存失败')
        } finally {
            setNotebookSaving('')
        }
    }
    return (
        <div>
            {reordered.map((notebook) => (
                <div
                    className={clsx(
                        'my-2 block rounded p-2',
                        {
                            'hover:cursor-pointer  hover:bg-green-100':
                                !isLoading,
                        },
                        {
                            'bg-green-200': notebook.id === newNotebookId,
                        },
                    )}
                    key={notebook.id}
                    onClick={() => handleSavQuestionSet(notebook.id)}
                >
                    {notebook.title}{' '}
                    {isLoading && notebookSaving === notebook.id && (
                        <>
                            {' '}
                            <Spinner />
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
