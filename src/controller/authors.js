const authors = require('../model/authors')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		try{
			const params = request.query
			const result = await authors.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		try {
			const authorId = request.params.authorId
			const result = await authors.get(authorId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		try {
			const setData = request.body
			const result = await authors.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		try {
			const authorId = request.params.authorId
			const setData = request.body
			const result = await authors.put(authorId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		try {
			const authorId = request.params.authorId
			const result = await authors.delete(authorId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}