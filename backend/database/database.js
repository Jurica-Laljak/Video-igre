const {Client} = require('pg')
const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "111111lol",
        database: "Video-igre"
})
client.connect()
module.exports = {
	query: (SQL, params) => client.query(SQL, params)
}