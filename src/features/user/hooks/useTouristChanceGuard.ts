import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectIsLogin } from '../userSlice'

/**
 * 如果游客不再有做题机会，就跳转到登录页
 */
export function useTouristChanceGuard() {
    const navigate = useNavigate()

    const hasFetcedLocalUser = useAppSelector(
        (state) => state.user.hasFetcedLocalUser,
    )
    const isLogin = useAppSelector(selectIsLogin)

    const touristQuizChance = useAppSelector(
        (state) => state.user.touristQuizChance,
    )

    useEffect(() => {
        if (hasFetcedLocalUser && !isLogin) {
            if (touristQuizChance <= 0) {
                toast.error('请登录后继续做题')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        }
    }, [touristQuizChance, hasFetcedLocalUser, isLogin, navigate])
}
