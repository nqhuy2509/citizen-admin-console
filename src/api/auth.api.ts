import request from './api.service'

export const loginAPI = (username: string, password: string) => {
    const data = {
        username,
        password
    }

    return request.post('/admin/login', data)
}