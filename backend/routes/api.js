const express = require('express')
const openapi = require('./openapi')
const collection = require('./collection')
const resource = require('./resource')
const genre = require('./genre')
const ids = require('./ids')
const dlc = require('./dlc')

const router = express.Router()

router.use("/openapi", openapi)
router.use("/collection", collection)
router.use("/resource", resource)
router.use("/genre", genre)
router.use("/ids", ids)
router.use("/dlc", dlc)

module.exports = router