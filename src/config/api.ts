import axios from 'axios'

const baseUrl = import.meta.env.VITE_APP_TMDB_URL
const apiToken = import.meta.env.VITE_APP_TMDB_TOKEN

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiToken}`
  }
})

export default api
