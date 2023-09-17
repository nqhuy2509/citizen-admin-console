import axios from "axios";

import {getToken} from '../redux/reducers/auth.slice'
import store from "../redux/store";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API
});


instance.interceptors.request.use(
    async (config) => {
        const token = getToken(store.getState().auth)

        if (token) {
            config.headers.Authorization = `Bearer ${token}`


        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance