const express = require('express')
const dbQuery = require("../database/dbQuery")

const router = express.Router()

router.all("/", async (req, res, next) => {
  responseEnvelope = {}
  if (req.method !== "GET") {
    responseEnvelope.status = "Method Not Allowed"
    responseEnvelope.message = "Nad " + req.originalUrl + " nije dozovljena metoda " + req.method
    responseEnvelope.response = { "allowedMethod": "GET" }
    res.status(405).json(responseEnvelope)
  }

  try {
    result = await dbQuery(`SELECT DISTINCT genre
                              FROM GAMES
                              ORDER BY genre ASC
                              `)
    var respArray = []
    for (key in result) {
      respArray[key] = result[key].genre
    }
    responseEnvelope.status = "OK"
    responseEnvelope.message = "Žanrovi uspješno dohvaćeni"
    responseEnvelope.response = respArray
    res.json(responseEnvelope)

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju žanrova"
    next(err)
  }
})

module.exports = router