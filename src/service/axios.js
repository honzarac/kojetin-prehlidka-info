import Axios from "axios";

const client = Axios.create({
    baseURL: 'http://localhost:8080',
    //validateStatus: status => status >= 200 && status < 300 //mezi 200 - 299
})

client.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error)=>{
        if (error.status == 400) {
            alert('Chyba API');
        }
    }
)

export default client
