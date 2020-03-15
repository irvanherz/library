const publishers = require('../model/publishers')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		try{
			const params = request.query
			const result = await publishers.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		try {
			const publisherId = request.params.publisherId
			const result = await publishers.get(publisherId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		try {
			const setData = request.body
			const result = await publishers.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		try {
			const publisherId = request.params.publisherId
			const setData = request.body
			const result = await publishers.put(publisherId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		try {
			const publisherId = request.params.publisherId
			const result = await publishers.delete(publisherId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}