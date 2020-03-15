const members = require('../model/members')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		try{
			const params = request.query
			const result = await members.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		try {
			const memberId = request.params.memberId
			const result = await members.get(memberId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		try {
			const setData = request.body
			const result = await members.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		try {
			const memberId = request.params.memberId
			const setData = request.body
			const result = await members.put(memberId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		try {
			const memberId = request.params.memberId
			const result = await members.delete(memberId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}