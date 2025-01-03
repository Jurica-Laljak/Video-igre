const express = require('express')
const dbQuery = require("../database/dbQuery")
const queryHeader = require("../database/queryHeader")
const queryFooter = require("../database/queryFooter")

const router = express.Router()

router.get("/", async (req, res, next) => {
  responseEnvelope = {}

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