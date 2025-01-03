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
  if (res.locals.errmessage) {  //locals.errmessage contains a message about the error
                                //that a middleware function can send
    err.message = res.locals.errmessage
  }
  errorEnvelope = new Envelope("Internal server error",
      err.message, null)
  res.status(500).json(errorEnvelope)
})

module.exports = router