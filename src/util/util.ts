import axios from "axios"

const api = axios.create({
    baseURL:`https://menu-api-gamma.vercel.app/v1`
})

export default api