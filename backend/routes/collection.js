const express = require('express')
const dbQuery = require("../database/dbQuery")
const queryHeader = require("../database/queryHeaderWithId")
const queryFooter = require("../database/queryFooter")

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
    result = await dbQuery(queryHeader + queryFooter)
    responseEnvelope.status = "OK"
    responseEnvelope.message = "Kolekcija uspješno dohvaćena"
    responseEnvelope.response = result
    res.json(responseEnvelope)

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju kolekcije"
    next(err)
  }
})

module.exports = router