const express = require('express')
const dbQuery = require("../database/dbQuery")

const router = express.Router()

router.all("/", async (req, res, next) => {
  responseEnvelope = {}
  //route method handler
  if (req.method !== "GET") {
    responseEnvelope.status = "Method Not Allowed"
    responseEnvelope.message = "Nad " + req.originalUrl + " nije dozovljena metoda " + req.method
    responseEnvelope.response = { "allowedMethod": "GET" }
    res.status(405).json(responseEnvelope)
  }

  try {
    result = await dbQuery(`SELECT GAMES.id,
                              GAMES.name
                              
                              FROM GAMES`)
    responseEnvelope.status = "OK"
    responseEnvelope.message = "Popis svih id-ova dohvaćen"
    responseEnvelope.response = result
    res.json(responseEnvelope)

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju popisa id-ova"
    next(err)
  }
})

module.exports = router