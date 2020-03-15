const connection = require('../config/mysql')
const util = require('util')
const mysqlQuery = util.promisify(connection.query).bind(connection)

module.exports = {
	gets: ({ search='', page=1, capacity=10, sortBy='name', sortOrder='asc' } = {}) => {
		//Filtering
		let wheres = []
		if (search) {
			wheres.push(`((name LIKE '%${search}%') OR (name LIKE '%${search}%'))`)
		}
		const whereClause = (wheres.length) ? 'WHERE ' + wheres.join(' AND ') : ''
		const orderClause = `ORDER BY ${sortBy} ${sortOrder}`
		const limitClause = `LIMIT ${(page - 1) * capacity},${capacity}`
		
		return mysqlQuery(`SELECT * FROM publishers ${whereClause} ${orderClause} ${limitClause}`).then(
			items => {
				return mysqlQuery(`SELECT COUNT(*) AS cnt FROM publishers ${whereClause}`).then(
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
	get: (publisherId) => {
		return mysqlQuery(`SELECT * FROM publishers WHERE id='${publisherId}'`).then(
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
		return mysqlQuery('INSERT INTO publishers SET ?', setData).then(
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
	put: (publisherId, setData) => {
		return mysqlQuery(`UPDATE publishers SET ? WHERE id=${publisherId}`, setData).then(
			result => {
				if (result.affectedRows) {
					return({ id: publisherId, ...setData })
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
	delete: (publisherId) => {
		return mysqlQuery(`DELETE FROM publishers WHERE id='${publisherId}'`).then(
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