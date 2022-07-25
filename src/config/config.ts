if (process.env.NODE_ENV !== "test" && !process.env.REACT_APP_API_URL) {
    throw new Error("env 环境找不到 API_URL");
}

if (!process.env.REACT_APP_VERSION) {
    throw new Error("env 环境找不到 VERSION");
}

const config = {
    BASE_URL: process.env.REACT_APP_API_URL,
    VERSION: process.env.REACT_APP_VERSION,
};

export default config;
