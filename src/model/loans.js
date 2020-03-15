const connection = require('../config/mysql')
const util = require('util')
const mysqlQuery = util.promisify(connection.query).bind(connection)

module.exports = {
	gets: ({ memberId='', page=1, capacity=10, sortBy='updatedAt', sortOrder='desc' } = {}) => {
		//Filtering
		let wheres = []
		if (memberId) {
			wheres.push(`(memberId=${memberId})`)
		}
		const whereClause = (wheres.length) ? 'WHERE ' + wheres.join(' AND ') : ''
		const orderClause = `ORDER BY ${sortBy} ${sortOrder}`
		const limitClause = `LIMIT ${(page - 1) * capacity},${capacity}`
		
		return mysqlQuery(`SELECT * FROM loans ${whereClause} ${orderClause} ${limitClause}`).then(
			items => {
				return mysqlQuery(`SELECT COUNT(*) AS cnt FROM loans ${whereClause}`).then(
					count => {
						const totalItems = count[0].cnt
						const totalPages = Math.ceil(totalItems / capacity)
						return ({
							currentPage: page,
							totalPages,
							totalItems,
							itemsPerPage: capacity,
							items
						})
					},
					() => {
						throw({
							code:'DbError',
							errno: 1001,
							message: 'Cannot read count data'
						})
					}
				)
			},
			() => {
				throw({
					code: 'DbError',
					errno: 1001,
					message: 'Cannot read data',

				})
			}
		)
	},
	get: (loanId) => {
		return mysqlQuery(`SELECT * FROM loans WHERE id='${loanId}'`).then(
			result => {
				if(result.length){
					return(result[0])
				} else {
					throw({
						code: 'DbError',
						errno: 1001,
						message: 'ID not exists'
					})
				}
			},
			() => {
				throw({
					code: 'DbError',
					errno: 1001,
					message: 'Cannot read data'
				})
			}
		)
	},
	post: (setData) => {
		return mysqlQuery('INSERT INTO loans SET ?', setData).then(
			result => {
				return({id:result.insertId, ...setData})
			},
			() => {
				throw({
					code: 'DbError',
					errno: 1001,
					message: 'Cannot write data'
				})
			}
		)
	},
	put: (loanId, setData) => {
		return mysqlQuery(`UPDATE loans SET ? WHERE id=${loanId}`, setData).then(
			result => {
				if (result.affectedRows) {
					return({ id: loanId, ...setData })
				} else {
					throw({
						code: 'DbError',
						errno: '1105',
						message: 'ID not exists'
					})
				}
				
			},
			() => {
				throw({
					code: 'DbError',
					errno: 1001,
					message: 'Cannot edit data'
				})
			}
		)
	},
	delete: (loanId) => {
		return mysqlQuery(`DELETE FROM loans WHERE id='${loanId}'`).then(
			result => {
				if (result.affectedRows) {
					return({message:'OK'})
				} else {
					throw({
						code: 'DbError',
						errno: '1105',
						message: 'ID not exists'
					})
				}

			},
			() => {
				throw({
					code: 'DbError',
					errno: 1001,
					message: 'Cannot delete data'
				})
			}
		)
	},
}