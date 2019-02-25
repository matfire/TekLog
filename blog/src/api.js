import axios from 'axios'

let api = axios.create({
	baseURL: "https:api.teklog.matteogassend.com"
})

export default api
