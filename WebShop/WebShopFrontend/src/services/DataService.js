import  Axios  from "axios";

Axios.defaults.withCredentials = true
Axios.defaults.baseURL='http://localhost:3000/api';


export default {
    getAllProducts(){
        return Axios.get('/products')
        .then(resp => {
            return resp.data
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    },

    getProductById(id){
        return Axios.get('/product/'+id)
        .then(resp => {
            return resp.data
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    }
}