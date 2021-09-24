const database = require('../../src/database.js')
const connect = database.connect
const db = connect()

module.exports = { db } 