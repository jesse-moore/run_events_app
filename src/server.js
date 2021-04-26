'use strict'
const mysql = require('serverless-mysql')({
    config: {
        host: process.env.ENDPOINT,
        database: process.env.DATABASE,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
})

const config = {
    host: process.env.ENDPOINT,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
}
module.exports.server = async () => {
    try {
        console.log(config.database)
        console.log(config.host)
        console.log(config.user)
        console.log(config.password)
        await mysql.connect()
        let results = await mysql.query(
            'SELECT message FROM run_events.test WHERE id>0'
        )
        return results
    } catch (error) {
        console.log(error)
    } finally {
        await mysql.end()
    }
}
