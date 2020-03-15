const categories = require('../model/categories')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		try{
			const params = request.query
			const result = await categories.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		try {
			const categoryId = request.params.categoryId
			const result = await categories.get(categoryId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		try {
			const setData = request.body
			const result = await categories.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		try {
			const categoryId = request.params.categoryId
			const setData = request.body
			const result = await categories.put(categoryId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		try {
			const categoryId = request.params.categoryId
			const result = await categories.delete(categoryId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}