import axios from 'axios'

let api = axios.create({
	baseURL: "http://127.0.0.1:4000"
})

export default api