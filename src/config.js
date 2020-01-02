
export default {
  API_ENDPOINT: process.env.NODE_ENV === 'production'
    ? 'https://young-journey-12078.herokuapp.com'
    : 'http://localhost:8000',
  API_KEY: process.env.REACT_APP_API_KEY,
  FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
  FB_APP_SECRET: process.env.REACT_APP_FB_APP_SECRET
}
