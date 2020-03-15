const connection = require('../config/mysql')
const util = require('util')
const mysqlQuery = util.promisify(connection.query).bind(connection)

module.exports = {
	gets: ({ search, page=1, capacity=10, sortBy='updatedAt', sortOrder='desc' } = {}) => {
		//Filtering
		let wheres = []
		if (search) {
			wheres.push(`((name LIKE '%${search}%') OR (name LIKE '%${search}%'))`)
		}
		const whereClause = (wheres.length) ? 'WHERE ' + wheres.join(' AND ') : ''
		const orderClause = `ORDER BY ${sortBy} ${sortOrder}`
		const limitClause = `LIMIT ${(page - 1) * capacity},${capacity}`
		
		return mysqlQuery(`SELECT * FROM members ${whereClause} ${orderClause} ${limitClause}`).then(
			items => {
				return mysqlQuery(`SELECT COUNT(*) AS cnt FROM members ${whereClause}`).then(
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
	get: (memberId) => {
		return mysqlQuery(`SELECT * FROM members WHERE id='${memberId}'`).then(
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
		return mysqlQuery('INSERT INTO members SET ?', setData).then(
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
	put: (memberId, setData) => {
		return mysqlQuery(`UPDATE members SET ? WHERE id=${memberId}`, setData).then(
			result => {
				if (result.affectedRows) {
					return({ id: memberId, ...setData })
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
	delete: (memberId) => {
		return mysqlQuery(`DELETE FROM members WHERE id='${memberId}'`).then(
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