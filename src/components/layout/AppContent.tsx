import React from 'react'

export default function AppContent({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-200 pt-5">
            <div className="mx-auto max-w-4xl px-4">{children}</div>
        </div>
    )
}
