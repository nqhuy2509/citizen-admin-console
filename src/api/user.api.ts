import request from './api.service'

export const getAllUser = (query = { all: true }) => {
	return request.get(`/user?all=${query.all}`)
}
