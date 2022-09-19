import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Page404 from '../pages/404Page'
import AccountPage from '../pages/AccountPage'

import BookDetail from '../pages/BookDetailPage'
import ChapterResultPage from '../pages/ChapterResultPage'
import ContactPage from '../pages/ContactPage'
import Home from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotebookListPage from '../pages/NotebookListPage'
import PracticeChapterPage from '../pages/PracticeChapterPage'
import PracticeReviewPage from '../pages/PracticeReviewPage'
import RendererExample from '../pages/RendererExamplePage'
import ShelfPage from '../pages/ShelfPage'
import WeChatLoginResult from '../pages/WxLoginResultPage'
import NotebookPage from '../pages/NotebookPage'
import PracticeNotebookPage from '../pages/PracticeNotebookPage'

type Props = {
    children: React.ReactElement
}

export default function Router({ children }: Props) {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                <Route path="*" element={<Page404 />} />

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/shelf" element={<ShelfPage />} />
                <Route path="/notebooks" element={<NotebookListPage />} />
                <Route
                    path="/notebooks/:notebookId"
                    element={<NotebookPage />}
                />
                <Route
                    path="/notebooks/:notebookId/index/:questionSetIndex"
                    element={<PracticeNotebookPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}
