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

/**
 * 从 localStorage 获取 tourist quiz chance
 */
const getTouristQuizChance = () => {
    const chance = localStorage.getItem('touristQuizChance')
    // 不允许大于20的数字
    if (chance && parseInt(chance) > 20) {
        throw Error('getTouristQuizChance: tourist quiz chance 异常')
    }

    if (chance !== null) {
        return parseInt(chance)
    }
}

const setTouristQuizChance = (chance: number) => {
    localStorage.setItem('touristQuizChance', chance.toString())
}

const userStorage = {
    setUserInfo,
    getUserInfo,
    removeUserInfo,
    getTouristQuizChance,
    setTouristQuizChance,
}

export default userStorage
