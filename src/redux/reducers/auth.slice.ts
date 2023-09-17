import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAuthState {
    token: string | null,
    username: string | null,
    role: string | null,
    isLogin: boolean,
    error: string| null
}

const initialState: IAuthState = {
    token: null,
    username: null,
    role: null,
    isLogin: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token
            state.username = action.payload.username
            state.role = action.payload.role
            state.isLogin = true
            state.error = null
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLogin = false
        },
        logoutSuccess: (state) => {
            state.token = null
            state.username = null
            state.role = null
            state.isLogin = false
            state.error = null
        }
    }
})

export const {loginSuccess, logoutSuccess, loginFailed} = authSlice.actions
export default authSlice.reducer

export const getToken = createSelector((state: IAuthState) => state.token, token => token)