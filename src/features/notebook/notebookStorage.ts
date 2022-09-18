const setProgress = (notebookId: string, index: number) => {
    localStorage.setItem(`notebook_${notebookId}`, index.toString())
}

const getProgress = (notebookId: string) => {
    const progressIndex = localStorage.getItem(`notebook_${notebookId}`)
    return progressIndex ? parseInt(progressIndex) : 0
}

const notebookStorageService = {
    setProgress,
    getProgress,
}

export default notebookStorageService
