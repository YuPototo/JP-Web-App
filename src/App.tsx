import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppNav from './components/AppNav'
import { useAppDispatch, useAppSelector } from './store/hooks'
import Modal from 'react-modal'
import { getLocalUserInfo, getTouristChance } from './features/user/userThunks'
import { getWorkingProgress } from './features/progress/progressThunks'
import { selectIsLogin } from './features/user/userSlice'
import { useGetUserQuery } from './features/user/userService'
import AppContent from './components/layout/AppContent'
import PageRoutes from './routes/PageRoutes'

Modal.setAppElement('#root')

function App() {
    const dispatch = useAppDispatch()

    const isLogin = useAppSelector(selectIsLogin)

    useGetUserQuery(undefined, { skip: !isLogin })

    useEffect(() => {
        dispatch(getLocalUserInfo())
        dispatch(getWorkingProgress())
        dispatch(getTouristChance())
    }, [dispatch])

    return (
        <>
            <Toaster />
            <AppNav />
            <AppContent>
                <PageRoutes></PageRoutes>
            </AppContent>
        </>
    )
}

export default App
