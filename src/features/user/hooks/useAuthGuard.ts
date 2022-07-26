import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/routeBuilder'
import { useAppSelector } from '../../../store/hooks'
import { selectIsLogin } from '../userSlice'

export default function useAuthGuard() {
    const navigate = useNavigate()

    const hasFetcedLocalUser = useAppSelector(
        (state) => state.user.hasFetcedLocalUser,
    )
    const isLogin = useAppSelector(selectIsLogin)

    useEffect(() => {
        if (!hasFetcedLocalUser) return

        let timer: NodeJS.Timeout | null = null
        if (!isLogin) {
            toast('请登录')
            timer = setTimeout(() => {
                navigate(routes.login())
            }, 2000)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [hasFetcedLocalUser, isLogin, navigate])

    return isLogin
}
