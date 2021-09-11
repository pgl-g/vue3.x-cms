let BASE_URL = ''
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8080/'
} else {
  BASE_URL = 'http://123.207.32.32:8080/'
}

export { BASE_URL, TIME_OUT }
