import React from 'react'

export default function ContactPage() {
    return (
        <div className="rounded bg-white py-4 px-6">
            <h1 className="mb-4 text-lg font-bold text-green-600">
                联系开发者
            </h1>
            <div className="ml-2">
                <p className="my-2">你好，我是《日语轻松考》的开发者，覃煜。</p>
                <p className="my-2">我是个初级日语学习者。</p>
                <p className="my-2">如果你有任何问题，欢迎联系我。</p>
                <div className=" center ml-4 mt-4">
                    <img
                        className="mx-auto shadow"
                        src="https://asset-cdn.riyu.love/images/qr_code.jpeg"
                        alt="qr_code"
                    />
                    <div className="mt-1 text-center text-sm text-gray-500">
                        微信号：yjjs18599007893
                    </div>
                </div>
            </div>
        </div>
    )
}
