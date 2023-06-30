import axios from "axios"

const api = axios.create({
    baseURL:`https://6183cb0191d76c00172d1b6b.mockapi.io/api`
})

export default api