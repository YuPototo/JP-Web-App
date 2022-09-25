import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppNav from './components/AppNav'
import Router from './routes/Router'
import { useAppDispatch, useAppSelector } from './store/hooks'
import Modal from 'react-modal'
import { getLocalUserInfo, getTouristChance } from './features/user/userThunks'
import { getWorkingProgress } from './features/progress/progressThunks'
import { selectIsLogin } from './features/user/userSlice'
import { useGetUserQuery } from './features/user/userService'

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
            <div className="min-h-screen bg-gray-200 pt-5">
                <div className="mx-auto max-w-4xl">
                    <Router>
                        <AppNav />
                    </Router>
                </div>
            </div>
        </>
    )
}

export default App
