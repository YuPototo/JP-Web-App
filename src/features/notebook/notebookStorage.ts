const setProgress = (notebookId: string, progress: string | 0 | 1) => {
    let value = typeof progress === 'string' ? progress : progress.toString()
    localStorage.setItem(`notebook_${notebookId}`, value)
}

const getProgress = (notebookId: string) => {
    const value = localStorage.getItem(`notebook_${notebookId}`)
    if (!value) {
        return 0
    }

    const intValue = parseInt(value)
    if (intValue === 0 || intValue === 1) {
        return intValue
    } else {
        return value
    }
}

const resetProgress = (notebookId: string) => {
    localStorage.removeItem(`notebook_${notebookId}`)
}

const notebookStorageService = {
    setProgress,
    getProgress,
    resetProgress,
}

export default notebookStorageService
