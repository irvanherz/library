const connection = require('../config/mysql')
const util = require('util')
const mysqlQuery = util.promisify(connection.query).bind(connection)

module.exports = {
	gets: ({ search='', page=1, capacity=10, sortBy='updatedAt', sortOrder='desc' } = {}) => {
		//Filtering
		let wheres = []
		if (search) {
			wheres.push(`((title LIKE '${search}%') OR (title LIKE '%${search}') OR (title LIKE '%${search}%'))`)
		}
		const whereClause = (wheres.length) ? 'WHERE ' + wheres.join(' AND ') : ''
		const orderClause = `ORDER BY ${sortBy} ${sortOrder}`
		const limitClause = `LIMIT ${(page - 1) * capacity},${capacity}`
		const query1 = `
						SELECT * FROM (
							SELECT a.*, b.name authorName, c.name publisherName, d.name categoryName
							FROM books a
							LEFT JOIN authors b ON b.id=a.authorId
							LEFT JOIN publishers c ON c.id=a.publisherId
							LEFT JOIN categories d ON d.id=a.categoryId
						) x
						${whereClause} ${orderClause} ${limitClause}`
		const query2 = `
						SELECT COUNT(*) cnt FROM (
							SELECT a.*, b.name authorName, c.name publisherName, d.name categoryName
							FROM books a
							LEFT JOIN authors b ON b.id=a.authorId
							LEFT JOIN publishers c ON c.id=a.publisherId
							LEFT JOIN categories d ON d.id=a.categoryId
						) x
						${whereClause}`

		return mysqlQuery(query1).then(
			items => {
				return mysqlQuery(query2).then(
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
	get: (bookId) => {
		return mysqlQuery(`SELECT * FROM books WHERE id='${bookId}'`).then(
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
		return mysqlQuery('INSERT INTO books SET ?', setData).then(
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
	put: (bookId, setData) => {
		return mysqlQuery(`UPDATE books SET ? WHERE id=${bookId}`, setData).then(
			result => {
				if (result.affectedRows) {
					return({ id: bookId, ...setData })
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
	delete: (bookId) => {
		return mysqlQuery(`DELETE FROM books WHERE id='${bookId}'`).then(
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