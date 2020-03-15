const books = require('../model/books')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		const params = request.query
		try{
			const result = await books.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		const bookId = request.params.bookId
		try {
			const result = await books.get(bookId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		const setData = request.body
		const allowedFields = ['title', 'year', 'summary', 'authorId', 'publisherId', 'categoryId']
		Object.keys(setData).forEach(key => {
			if(!allowedFields.includes(key)){
				delete setData[key]
			}
		})
		try {
			const result = await books.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		const bookId = request.params.bookId
		const setData = request.body
		const allowedFields = ['title', 'year', 'summary', 'authorId', 'publisherId', 'categoryId']
		Object.keys(setData).forEach(key => {
			if (!allowedFields.includes(key)) {
				delete setData[key]
			}
		})
		try {
			const result = await books.put(bookId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		const bookId = request.params.bookId
		try {
			const result = await books.delete(bookId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}