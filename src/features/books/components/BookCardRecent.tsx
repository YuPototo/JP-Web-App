import React from 'react'
import Button from '../../../components/ui/Button'
import { useWorkingBook } from '../../progress/hooks/useWorkingBook'

export default function BookCardRecent() {
    const { book } = useWorkingBook()

    if (!book) {
        return <></>
    }

    return (
        <div className="flex h-44 w-full gap-4 rounded bg-gray-800 p-2 hover:shadow-md">
            <div className="ml-4 h-full rounded">
                <img className="h-full rounded" alt="封面" src={book.cover} />
            </div>
            <div className="relative flex flex-grow flex-col">
                <div className="my-3">
                    <span className="rounded-3xl bg-gray-500 py-2 px-4 text-white">
                        上次练习
                    </span>
                </div>
                <div className="text-xl text-white">{book.title}</div>
                <div className="text-white">{book.desc}</div>
                <div className="mt-auto">
                    <Button outline>继续练习</Button>
                </div>
            </div>
        </div>
    )
}
