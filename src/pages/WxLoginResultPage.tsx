import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useLoginMutation } from '../features/user/userService'
import WeChatLoginBtn from '../features/user/components/WeChatLoginBtn'
import { routes } from '../routes/routeBuilder'

export default function WeChatLoginResult() {
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    const navigate = useNavigate()

    const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation()

    useEffect(() => {
        if (code) {
            login(code)
        }
    }, [code, login])

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => navigate(routes.home()), 2000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess, navigate])

    const showError = !code || isError

    return (
        <div>
            {isLoading && <div>登陆中...</div>}
            {showError && (
                <div>
                    {!code && <div>没有 loginCode </div>}
                    {isError && <div>登陆失败：{JSON.stringify(error)}</div>}
                    <div>
                        再次登陆：
                        <WeChatLoginBtn />
                        <Link to={routes.contact()}>联系开发者</Link>
                    </div>
                </div>
            )}

            {isSuccess && <div>成功登陆，即将返回首页...</div>}
        </div>
    )
}
