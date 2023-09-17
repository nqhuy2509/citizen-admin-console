import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import authSlice, {IAuthState} from "./reducers/auth.slice";

import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";

import rootReducer from "./reducers";

export interface IRootState {
    auth: IAuthState
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
const persistor = persistStore(store);

export {persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()


export default store