export const routes = {
    home: () => '/',
    contact: () => '/contact',
    renderExample: () => '/renderExample',
    account: () => `/account`,
    login: () => `/login`,
    shelf: () => `/shelf`,
    bookDetail: (bookId: string) => `/books/${bookId}`,
    practiceChapter: (chapterId: string, questionSetIndex: number) =>
        `/chapter/${chapterId}/index/${questionSetIndex}`,
    chapterResult: (chapterId: string) => `/chapterResult/${chapterId}`,
    practiceReview: (chapterId: string) => `/practiceReview/${chapterId}`,
    notebookList: () => '/notebooks',
    notebook: (notebookId: string) => `/notebooks/${notebookId}`,
    practiceNotebook: (notebookId: string, questionSetId: string) =>
        `/notebooks/${notebookId}/questionSet/${questionSetId}`,
    wrontNotebook: () => '/wrongNotebook',
    practiceWrongRecord: () => '/practiceWrongRecord',
}
