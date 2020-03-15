const loans = require('../model/loans')
const helper = require('../helper')
module.exports = {
	gets: async (request, response) => {
		try{
			const params = request.query
			const result = await loans.gets(params)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
        
	},
	get: async (request, response) => {
		try {
			const loanId = request.params.loanId
			const result = await loans.get(loanId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	post: async (request, response) => {
		try {
			const setData = request.body
			const result = await loans.post(setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	put: async (request, response) => {
		try {
			const loanId = request.params.loanId
			const setData = request.body
			const result = await loans.put(loanId, setData)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
	delete: async (request, response) => {
		try {
			const loanId = request.params.loanId
			const result = await loans.delete(loanId)
			return helper.response(response, 200, result)
		} catch (error) {
			return helper.response(response, 400, error)
		}
	},
}