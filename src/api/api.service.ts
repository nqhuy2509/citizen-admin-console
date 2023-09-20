import axios from "axios";

import {getToken} from '../redux/reducers/auth.slice'
import store from "../redux/store";
import {useDispatch} from "react-redux";
import {logout} from "../redux/thunks/auth.thunk";

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


instance.interceptors.response.use(
    (response) => {
        return response
    }, (error) => {
        console.log(error)
        if (error.response.status === 401 || error.response.status === 403) {
            store.dispatch(logout())

        }
    }
)

export default instance