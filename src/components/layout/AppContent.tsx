import React from 'react'
import Footer from '../Footer'

export default function AppContent({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className=" bg-gray-200 pt-5">
            <div className="mx-auto min-h-screen max-w-4xl px-4">
                {children}
            </div>
            <Footer />
        </div>
    )
}
