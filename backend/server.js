const express = require("express")
const api = require("./routes/api")

const fs = require("node:fs")
const db = require("./database/database")
const queryHeader = require("./database/queryHeader")
const queryFooter = require("./database/queryFooter")
const rows = require("./data/rows")
const Envelope = require('./data/schemas/envelope')

const app = express()

app.use(express.static("../frontend"))  //static delivery middleware
app.use(express.json())   //json response writer middleware

app.get("/video-igre.csv", (req, res) => {
        res.download("../video-igre.csv")
})

app.get("/video-igre-formatted.json", (req, res) => {
        res.download("../video-igre-formatted.json")
})

let queryStorage = ""

async function dbQuery(SQLquery) {
        try {
                const result = await db.query(SQLquery)
                return result.rows
        } catch (err) {
                throw new Error(err)
        }
}

app.get("/filter/:filterby&:query?", async (req, res) => {
        if (!req.params["query"]) {
                req.params["query"] = ""
        }
        let userQuery = req.params["query"]
        let filter = req.params["filterby"]

        //determine data type of query
        let queryType = "str"
        const dateRegex = new RegExp("[1-9][0-9][0-9][0-9]-((0[1-9])|(1[1-2]))-(((0|1|2)[1-9])|(3(0|1)))")
        if (dateRegex.test(userQuery)) {
                queryType = "date"
        } else if (userQuery.toLowerCase() == "false" || userQuery.toLowerCase() == "true") {
                queryType = "bool"
        } else if (userQuery == "") {
                queryType = "NO FILTER"
        } else if (!isNaN(userQuery)) {
                queryType = "num"
        }
        let SQLquery = queryHeader + "\n\n"
        console.log(queryType)

        //create WHERE condition
        if (queryType != "NO FILTER") {
                SQLquery = SQLquery + "WHERE "
                let alreadyExists = false
                for (let el in rows) {
                        console.log(el, filter)
                        if ((filter == "*") || (el == filter)) {
                                if ((rows[el] == "str") && ((queryType == "str"))) {
                                        if (alreadyExists) {
                                                SQLquery += "   OR "
                                        }
                                        SQLquery = SQLquery + "LOWER(" + el + ") LIKE '%" + userQuery.toLowerCase() + "%'\n"
                                        alreadyExists = true

                                } else if ((rows[el] == "date") && (queryType == "date")) {
                                        if (alreadyExists) {
                                                SQLquery += "   OR "
                                        }
                                        SQLquery = SQLquery + el + " = '" + userQuery + "'\n"
                                        alreadyExists = true

                                } else if (((rows[el] == "bool") && (queryType == "bool")) || ((rows[el] == "num") && (queryType == "num"))) {
                                        if (alreadyExists) {
                                                SQLquery += "   OR "
                                        }
                                        SQLquery = SQLquery + el + " = " + userQuery + "\n"
                                        alreadyExists = true
                                }
                        }
                }
        }

        SQLquery += queryFooter
        //"\nGROUP BY GAMES.id\n\nORDER BY GAMES.id ASC\n"
        queryStorage = SQLquery
        resultJson = await dbQuery(SQLquery)
        res.json(resultJson)

        console.log(SQLquery)
        console.log(resultJson)
})

app.get("/download/csv", async (req, res) => {
        resultJson = await dbQuery(queryStorage)

        //create csv file base on resultJson
        let csvData = ""
        let newline = true
        for (let key in rows) {
                if (!newline) {
                        csvData += ","
                } else {
                        newline = false
                }
                key = key.split(".")
                csvData += key[1]

        }
        csvData += "\n"

        for (let i in resultJson) {
                let obj = resultJson[i]
                let platformIterate = 0
                let dlcIterate = 0
                for (let j in obj) {    //count how many times parent information will need to be repeated
                        let value = obj[j]
                        if (j == "platforms") {
                                platformIterate = value.length
                        } else if (j == "dlc") {
                                dlcIterate = Math.max(value.length, 1)
                        }
                }

                for (let x = 0; x < platformIterate; x++) {
                        for (let y = 0; y < dlcIterate; y++) {
                                let newLine = true
                                for (let k in obj) {
                                        if (!newLine) {
                                                csvData += ","
                                        } else {
                                                newLine = false
                                        }
                                        let value = obj[k]
                                        if (k == "platforms") {
                                                csvData += value[x]
                                        } else if (k == "dlc") {
                                                if ((typeof value[y] === 'undefined') || (Object.keys(value[y]).length == 0)) {        //if object empty
                                                        csvData += ",,"
                                                } else {
                                                        let addComma = false
                                                        let currentObject = value[y]
                                                        for (let l in currentObject) {  //iterating over specific dlc object
                                                                if (addComma) {
                                                                        csvData += ","
                                                                } else {
                                                                        addComma = true
                                                                }
                                                                csvData += currentObject[l]
                                                        }
                                                }
                                        } else {
                                                csvData += value
                                        }
                                }
                                csvData += "\n"
                        }
                }
        }
        //create csv file
        fs.writeFileSync("video-igre-filtered.csv", csvData, (err) => {
                if (err) {
                        console.error(err)
                } else {

                }
        })

        res.download("video-igre-filtered.csv")
})

app.get("/download/json", async (req, res) => {
        resultJson = await dbQuery(queryStorage)

        //create json file
        fs.writeFileSync("video-igre-filtered.json", JSON.stringify(resultJson), (err) => {
                if (err) {
                        console.error(err)
                } else {

                }
        })

        res.download("video-igre-filtered.json")
})

//api router
app.use('/api/v1', api)



//error handler
app.use((err, req, res, next) => {
        console.log(err.stack)
        console.log("\n")
        //creating envelope
        let status = "Internal server error"
        if (res.locals.errstatus) {  //use custom status if it exists
                status = res.locals.errstatus
        }
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                err.message = "JSON objekt nije ispravno definiran"
        } else if (res.locals.errmessage) {  //use custom error message if it exists
                err.message = res.locals.errmessage
        }

        let response = null
        if (res.locals.errresponse) { //use custom response if it exists
                response = res.locals.errresponse
        }
        errorEnvelope = new Envelope(status,
                err.message, response)

        //determining status Code    
        let statusCode = 500
        if (res.locals.errstatusCode) {  //use custom statusCode if it exists
                statusCode = res.locals.errstatusCode
        }

        //sending envelope
        res.status(statusCode).json(errorEnvelope)
})

app.listen(5173)
console.log("Listening on port 5173")
