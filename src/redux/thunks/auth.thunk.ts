import {loginAPI} from "../../api/auth.api";
import {loginFailed, loginSuccess, logoutSuccess} from "../reducers/auth.slice";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

type LoginResponse = {
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        username: string,
        role: string
    }
}

export const login = (email: string, password: string): any => async (dispatch: Dispatch) => {
    try {
        const response = await loginAPI(email, password)
        if (response.status === 200) {
            const data = response.data as LoginResponse
            dispatch(loginSuccess({
                token: data.data.accessToken,
                username: data.data.username,
                role: data.data.role,
            }))
        }
    } catch (e) {
        const err = e as AxiosError
        if (err.response?.status === 401 || err.response?.status === 404) {
            dispatch(loginFailed('Email hoặc mật khẩu không đúng'))
        } else {
            dispatch(loginFailed('Đã có lỗi xảy ra'))
        }
    }
}

export const logout = () : any => async (dispatch: Dispatch) => {
    dispatch(logoutSuccess())
}