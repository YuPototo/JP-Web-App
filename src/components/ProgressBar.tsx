import { ReactElement } from 'react'

interface Props {
    pct: number
}

export default function ProgressBar({ pct }: Props): ReactElement {
    return (
        <div className="h-1 w-full rounded bg-gray-300">
            <div
                className="h-1 rounded bg-green-500"
                style={{ width: pct * 100 + '%' }}
            ></div>
        </div>
    )
}
