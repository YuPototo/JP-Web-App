import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppNav from './components/AppNav'
import { getLocalUserInfo } from './features/user/userSlice'
import Router from './routes/Router'
import { useAppDispatch } from './store/hooks'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getLocalUserInfo())
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
