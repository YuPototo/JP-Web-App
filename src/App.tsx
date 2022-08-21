import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookDetail from './pages/BookDetailPage'
import ChapterResultPage from './pages/ChapterResultPage'
import Home from './pages/HomePage'
import PracticeChapterPage from './pages/PracticeChapterPage'
import PracticeReviewPage from './pages/PracticeReviewPage'
import RendererExample from './pages/RendererExamplePage'

function App() {
    return (
        <>
            <Toaster />
            <div className="min-h-screen bg-gray-200 pt-5">
                <div className="mx-auto max-w-4xl">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/books/:bookId"
                                element={<BookDetail />}
                            />
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
                                path="/renderExample"
                                element={<RendererExample />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    )
}

export default App
