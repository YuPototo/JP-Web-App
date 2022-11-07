import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer(): ReactElement {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row justify-center gap-10 bg-gray-200 pb-4 pt-10 text-sm text-gray-700">
            <div>
                <span
                    className="link mr-2"
                    onClick={() => navigate('/contact')}
                >
                    联系开发者
                </span>
            </div>
            <div>
                <span className="mr-2">备案号</span>
                <a className="text-green-600" href="https://beian.miit.gov.cn/">
                    粤ICP备2021141310号
                </a>
            </div>
        </div>
    )
}
