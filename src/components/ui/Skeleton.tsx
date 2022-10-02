import clsx from 'clsx'

type Props = {
    h?: string
    w?: string
    rounded?: string
}

export default function Skeleton({
    h = 'h-6',
    w = 'w-32',
    rounded = 'rounded-full',
}: Props) {
    return (
        <div
            className={clsx(
                'animate-pulse bg-gray-200 dark:bg-gray-400',
                h,
                w,
                rounded
            )}
        ></div>
    )
}
