const express = require('express')
const fs = require("node:fs")

const router = express.Router()

router.all("/", (req, res, next) => {
  responseEnvelope = {}

  fs.readFile("../openapi.json", function (err, data) {
    if (err) {  //error handling
      res.locals.errmessage = "Pogreška u dohvaćanju dokumentacije"
      next(err) 
    } else {  //usual scenario
      responseEnvelope.status = "OK"
      responseEnvelope.message = "Specifikacija uspješno dohvaćena"
      responseEnvelope.response = JSON.parse(data)
      res.json(responseEnvelope)
      return
    }
  })
})

module.exports = router