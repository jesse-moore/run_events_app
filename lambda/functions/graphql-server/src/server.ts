'use strict'
const mysql = require('serverless-mysql')({
    config: {
        host: process.env.ENDPOINT,
        database: process.env.DATABASE,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
	onConnectError: (error: Error) =>{
		console.log(error)
		return
	}
})
export const server = async () => {
    try {
        let results = await mysql.query(
            'SELECT message FROM test WHERE id>0'
        )
		console.log(results)
        return results
    } catch (error) {
        console.log(error)
    } finally {
        await mysql.end()
    }
}
