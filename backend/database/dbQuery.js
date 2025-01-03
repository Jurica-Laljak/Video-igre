const db = require("./database")

async function dbQuery(SQLquery) {
        try {
                const result = await db.query(SQLquery)
                return result.rows
        } catch (err) {
                throw new Error(err)
        }
}

module.exports = dbQuery