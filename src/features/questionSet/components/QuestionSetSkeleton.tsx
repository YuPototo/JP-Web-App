import React from 'react'
import Skeleton from '../../../components/ui/Skeleton'

export default function QuestionSetSkeleton() {
    return (
        <div>
            {/* body */}
            <div className="mb-8 flex flex-col gap-2">
                <Skeleton w="w-60" />
                <Skeleton w="w-80" />
            </div>

            {/* option */}
            <div className="ml-4 flex flex-col gap-4">
                <Skeleton w="w-16" />
                <Skeleton w="w-16" />
                <Skeleton w="w-16" />
                <Skeleton w="w-16" />
            </div>
        </div>
    )
}
