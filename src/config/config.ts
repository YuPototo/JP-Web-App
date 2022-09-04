interface Config {
    API_URL: string
    VERSION: string
    WX_APP_ID: string
    WX_REDIRECT_URL: string
}

const {
    REACT_APP_API_URL: API_URL,
    REACT_APP_VERSION: VERSION,
    REACT_APP_WX_APP_ID: WX_APP_ID,
    REACT_APP_WX_LOGIN_REDIRECT_URL: WX_REDIRECT_URL,
} = process.env

const config = {
    API_URL,
    VERSION,
    WX_APP_ID,
    WX_REDIRECT_URL,
}

const isTesting = process.env.NODE_ENV === 'test'

for (const [key, value] of Object.entries(config)) {
    if (value === undefined && !isTesting) {
        throw Error(`Env Var ${key} is undefined`)
    }
}

export default config as Config
