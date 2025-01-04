const express = require('express')
const dbQuery = require("../database/dbQuery")

const router = express.Router()

router.all("/", async (req, res, next) => {
  responseEnvelope = {}

  try {
    result = await dbQuery(`SELECT GAMES.id,
                              GAMES.name
                              
                              FROM GAMES`)
    responseEnvelope.status = "OK"
    responseEnvelope.message = "Popis svih id-ova dohvaćen"
    responseEnvelope.response = result
    res.json(responseEnvelope)
    return

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju popisa id-ova"
    next(err)
  }
})

module.exports = router