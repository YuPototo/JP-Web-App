import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccountPage from '../pages/AccountPage'

import BookDetail from '../pages/BookDetailPage'
import ChapterResultPage from '../pages/ChapterResultPage'
import ContactPage from '../pages/ContactPage'
import Home from '../pages/HomePage'
import PracticeChapterPage from '../pages/PracticeChapterPage'
import PracticeReviewPage from '../pages/PracticeReviewPage'
import RendererExample from '../pages/RendererExamplePage'
import WeChatLoginResult from '../pages/WeChatLoginResult'

type Props = {
    children: React.ReactElement
}

export default function Router({ children }: Props) {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books/:bookId" element={<BookDetail />} />
                <Route
                    path="/chapter/:chapterId/index/:questionSetIndex"
                    element={<PracticeChapterPage />}
                />
                <Route
                    path="/chapterResult/:chapterId"
                    element={<ChapterResultPage />}
                />
                <Route
                    path="/practiceReview/:questionSetId"
                    element={<PracticeReviewPage />}
                />
                <Route
                    path="/wechatLoginResult"
                    element={<WeChatLoginResult />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/renderExample" element={<RendererExample />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
        </BrowserRouter>
    )
}
