import { Link } from 'react-router-dom'
import NotebookCreator from '../features/notebook/components/NotebookCreator'
import NotebookList from '../features/notebook/components/NotebookListInPage'
import useAuthGuard from '../features/user/hooks/useAuthGuard'
import { routes } from '../routes/routeBuilder'

export default function NotebookListPage() {
    useAuthGuard()

    return (
        <div>
            <h1>笔记本, 错题本</h1>
            <Link to={routes.wrontNotebook()}>错题本</Link>
            <NotebookCreator />
            <NotebookList />
        </div>
    )
}
