import clsx from 'clsx'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../routes/routeBuilder'
import { useAppSelector } from '../../store/hooks'
import { selectIsLogin } from '../user/userSlice'
import { useGetNotebooksQuery } from './notebookService'
import { INotebook } from './notebookTypes'

export default function NotebookList() {
    const isLogin = useAppSelector(selectIsLogin)

    const { data, isLoading } = useGetNotebooksQuery(undefined, {
        skip: !isLogin,
    })

    return (
        <div>
            {isLoading && <div>加载中...</div>}
            {data && <Notebooks notebooks={data} />}
        </div>
    )
}

function Notebooks({ notebooks }: { notebooks: INotebook[] }) {
    const reordered = useOrderNotebooks(notebooks)
    const newNotebook = useAppSelector((state) => state.notebook.newNotebook)

    return (
        <div>
            {reordered.map((notebook) => (
                <Link
                    to={routes.notebook(notebook.id)}
                    className={clsx(
                        'my-2 block rounded p-2 hover:cursor-pointer hover:bg-green-100',
                        {
                            'bg-green-200': newNotebook === notebook.id,
                        },
                    )}
                    key={notebook.id}
                >
                    {notebook.title}
                </Link>
            ))}
        </div>
    )
}

/**
 * default notebooks should come first
 */
function useOrderNotebooks(notebooks: INotebook[]) {
    const reordered = useMemo(() => {
        const defaultNotebook = notebooks.find((el) => el.isDefault)

        if (!defaultNotebook) {
            return notebooks
        }

        const nonDefaultNotebooks = notebooks.filter((el) => !el.isDefault)

        return [defaultNotebook, ...nonDefaultNotebooks]
    }, [notebooks])
    return reordered
}
