import { Link } from 'react-router-dom'
import NotebookCreator from '../features/notebook/components/NotebookCreator'
import NotebookList from '../features/notebook/components/NotebookListInPage'
import useAuthGuard from '../features/user/hooks/useAuthGuard'
import { routes } from '../routes/routeBuilder'

export default function NotebookListPage() {
    useAuthGuard()

    return (
        <div>
            <h1 className="mb-4 text-xl text-green-700">错题本</h1>
            <Link
                className="my-3 block rounded bg-white py-2 px-4 hover:cursor-pointer hover:bg-green-100"
                to={routes.wrontNotebook()}
            >
                错题本
            </Link>

            <h1 className="mt-8 mb-4 text-xl text-green-700">笔记本</h1>
            <NotebookList />
            <NotebookCreator />
        </div>
    )
}
