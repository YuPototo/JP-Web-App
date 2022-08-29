const setUserInfo = (token: string, displayId: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('displayId', displayId)
}

const getUserInfo = () => {
    const token = localStorage.getItem('token')
    const displayId = localStorage.getItem('displayId')
    if (!token || !displayId) return
    return { token, displayId }
}

const removeUserInfo = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('displayId')
}

const storageService = {
    setUserInfo,
    getUserInfo,
    removeUserInfo,
}

export default storageService
