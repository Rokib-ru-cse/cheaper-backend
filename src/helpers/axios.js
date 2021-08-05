import { API } from "../urlConfig";
import axios from "axios";
import store from '../store/index'
import { authConstants } from "../store/actions/actionConstants";
// const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: API,
    headers:{
        Authorization : window.localStorage.getItem("token") ?`Bearer ${window.localStorage.getItem("token")}`:""
    }
});

axiosInstance.interceptors.request.use((req)=>{
    const {authReducers} = store.getState()
    if(authReducers.token){
        req.headers.Authorization = `Bearer ${authReducers.token}`
    }
    return req
})
axiosInstance.interceptors.response.use((res)=>{
    return res
},(error)=>{
    const {status} = error.response?error.response:500
    if(status && status === 500){
        window.localStorage.clear()
        store.dispatch({
            type:authConstants.LOGOUT_SUCCESS
        })
    }
    return Promise.reject(error)
})
export default axiosInstance;   