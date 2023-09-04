import axios from 'axios'

const url = process.env.NEXT_PUBLIC_API_URL

console.log("API_URL: ", url)

const api = axios.create({ 
    //baseURL: 'http://localhost:8080/api/v1' 
    baseURL: url
})

export default api