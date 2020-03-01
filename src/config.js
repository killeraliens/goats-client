export default {
  API_ENDPOINT: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:8000/api',
  API_KEY: process.env.REACT_APP_API_KEY,
  FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
  FB_APP_SECRET: process.env.REACT_APP_FB_APP_SECRET,
  X_RAPID_API_KEY: process.env.REACT_APP_X_RAPID_API_KEY
}
