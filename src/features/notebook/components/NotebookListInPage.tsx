import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { routes } from '../../../routes/routeBuilder'
import { useAppSelector } from '../../../store/hooks'
import { selectIsLogin } from '../../user/userSlice'
import { useGetNotebooksQuery } from '../notebookService'
import { INotebook } from '../notebookTypes'
import { useOrderNotebooks } from '../useOrderNotebooks'

export default function NotebookListInPage() {
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
    const newNotebookId = useAppSelector((state) => state.notebook.newNotebook)

    return (
        <div>
            {reordered.map((notebook) => (
                <Link
                    to={routes.notebook(notebook.id)}
                    className={clsx(
                        'my-3 block rounded bg-white py-2 px-4 hover:cursor-pointer hover:bg-green-100',
                        {
                            'bg-green-200': notebook.id === newNotebookId,
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
