import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookDetail from './pages/BookDetail'
import Home from './pages/Home'
import RendererExample from './pages/RendererExample'

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
