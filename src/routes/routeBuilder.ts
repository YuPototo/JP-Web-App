export const routeBuilder = {
    home: () => '/',
    contact: () => '/contact',
    renderExample: () => '/renderExample',
    account: () => `/account`,
    login: () => `/login`,
    bookDetail: (bookId: string) => `/books/${bookId}`,
    practiceChapter: (chapterId: string, questionSetIndex: number) =>
        `/chapter/${chapterId}/index/${questionSetIndex}`,
    chapterResult: (chapterId: string) => `/chapterResult/${chapterId}`,
    practiceReview: (chapterId: string) => `/practiceReview/${chapterId}`,
}
