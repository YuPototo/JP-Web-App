import React from 'react'

export default function QuestionSetSkeleton() {
    return (
        <div>
            {/* body */}
            <div className="mb-8 flex flex-col gap-2">
                <div className="skeleton h-6 w-80"></div>
                <div className="skeleton h-6 w-60"></div>
            </div>

            {/* option */}
            <div className="ml-4 flex flex-col gap-4">
                <div className="skeleton h-6 w-10"></div>
                <div className="skeleton h-6 w-10"></div>
                <div className="skeleton h-6 w-10"></div>
                <div className="skeleton h-6 w-10"></div>
            </div>
        </div>
    )
}
