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
    result = await dbQuery(`SELECT DISTINCT dlc_name AS name,
                              dlc_release_date AS release_date,
                              dlc_price AS price,
                              GAMES.name AS game


                              FROM DLCS JOIN GAMES
                                ON DLCS.id_game = GAMES.id

                              ORDER BY GAMES.name ASC
                              `)
    responseEnvelope.status = "OK"
    responseEnvelope.message = "DLC-ovi uspješno dohvaćeni"
    responseEnvelope.response = result
    res.json(responseEnvelope)

  } catch (err) {
    res.locals.errmessage = "Pogreška u dohvaćanju DLC-ova"
    next(err)
  }
})

module.exports = router