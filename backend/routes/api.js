const express = require('express')
const openapi = require('./openapi')
const collection = require('./collection')
const resource = require('./resource')
const genre = require('./genre')
const highrated = require('./highrated')
const dlc = require('./dlc')

const Envelope = require('../data/schemas/envelope')

const router = express.Router()

router.use("/openapi", openapi)
router.use("/collection", collection)
router.use("/resource", resource)
router.use("/genre", genre)
router.use("/highrated", highrated)
router.use("/dlc", dlc)

//error handler for api
router.use((err, req, res, next) => {
  //creating envelope
  let status = "Internal server error"
  if (res.locals.errstatus) {  //use custom status if it exists
    status = res.locals.errstatus
  }
  if (res.locals.errmessage) {  //use custom error message if it exists
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

module.exports = router