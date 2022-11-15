import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function Footer(): ReactElement {
    return (
        <div className="flex flex-row justify-center gap-10 bg-gray-200 pb-4 pt-10 text-sm text-gray-700">
            <div>
                <Link to="/contact" className="link mr-2">
                    联系开发者
                </Link>
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
