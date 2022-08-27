import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { IAudio } from '../questionSetTypes'

export default function AudioPlayer({ audio }: { audio?: IAudio }) {
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsError(false)
        setIsLoading(true)
    }, [audio])

    if (!audio) return null

    if (isError) {
        return <div>听力加载错误：{audio.key}</div>
    }

    return (
        <div>
            {isLoading && <div>听力加载中...</div>}
            <audio
                className={clsx({ invisible: isLoading })}
                controls
                autoPlay
                onCanPlay={() => setIsLoading(false)}
                onError={() => setIsError(true)}
                src={audio.key}
            />
        </div>
    )
}
