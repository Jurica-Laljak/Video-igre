const express = require('express')
const dbQuery = require("../database/dbQuery")

const router = express.Router()

router.all("/", async (req, res, next) => {
  responseEnvelope = {}

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
    return

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju žanrova"
    next(err)
  }
})

module.exports = router