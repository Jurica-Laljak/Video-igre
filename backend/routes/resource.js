const express = require('express')
const dbQuery = require("../database/dbQuery")
const queryHeader = require("../database/queryHeader")
const queryFooter = require("../database/queryFooter")

const router = express.Router()

router.get("/:id", async (req, res, next) => {
  responseEnvelope = {}
  let id = req.params.id
  try {
    result = await dbQuery(queryHeader +
      `WHERE GAMES.id = `
      + id
      + queryFooter)
    try {
      if ((Array.isArray(result)) && (result.length == 0)) {
        throw new Error("")
      }
      responseEnvelope.status = "OK"
      responseEnvelope.message = "Resurs uspješno dohvaćen"
      responseEnvelope.response = result
      res.json(responseEnvelope)
    } catch (err) {
      res.locals.errmessage = "Ne postoji resurs s danim ID-om"
      res.locals.errstatus = "Not Found"
      res.locals.errstatusCode = 404
      next(err)
    }

  } catch (err) {   //error handling
    res.locals.errmessage = "Pogreška u dohvaćanju resursa"
    next(err)
  }
})

module.exports = router