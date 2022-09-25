import { useAppSelector } from '../../../store/hooks'
import { selectIsLogin } from '../userSlice'

/**
 * 是否需要显示没有做题机会的 modal
 */
export function useChanceGuard() {
    const isLogin = useAppSelector(selectIsLogin)

    const isMember = useAppSelector((state) => state.user.isMember)

    const quizChance = useAppSelector((state) => state.user.quizChance)

    // 会员不考虑这个
    if (isMember) {
        return false
    }

    // 如果没登录，使用另一个 guard
    if (!isLogin) {
        return false
    }

    return quizChance <= 0
}
