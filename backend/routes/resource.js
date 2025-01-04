const express = require('express')

const dbQuery = require("../database/dbQuery")
const queryHeader = require("../database/queryHeaderWithId")
const queryFooter = require("../database/queryFooter")
const VideoGame = require("../data/schemas/video_game")
const Envelope = require('../data/schemas/envelope')
const selectQueryHeader = require("../database/resourceGet/selectQueryHeader.js")
const insertQueryHeader = require("../database/resourcePost/insertQueryHeader")
const deleteQueryHeader = require("../database/resourceDelete/deleteQueryHeader")

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

  } catch (err) {   //non-specific error handling
    res.locals.errmessage = "Pogreška u dohvaćanju resursa"
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  responseEnvelope = {}
  try {
    try {
      //console.log(req.body)
      if (Object.keys(req.body).length === 0) { //if body is empty
        throw new Error("Tijelo zahtjeva je prazno")
      }

      var videoGame = new VideoGame(req.body.name, req.body.release_date, req.body.developer,
        req.body.publisher, req.body.platforms, req.body.genre, req.body.price,
        req.body.metascore, req.body.has_singleplayer, req.body.has_multiplayer,
        req.body.dlc)

    } catch (err) { //body syntax not properly definied
      if (!err.message) {
        res.locals.errmessage = "Objekt nije ispravno definiran"
      }
      res.locals.errstatus = "Bad Request"
      res.locals.errstatusCode = 400
      next(err)
    }

    //checking if the same record already exists in database
    try {
      sqlQuery = selectQueryHeader + `'` + videoGame.name + `'` + queryFooter
      checkResult = await dbQuery(sqlQuery)
      if (checkResult.length > 0) {  //if result isn't empty, record already exists
        throw new Error("Zapis s identičnim imenom već postoji u bazi podataka")
      }
    } catch(err) {
      if (err.message) {
        res.locals.errmessage = err.message
      }
      res.locals.errstatus = "Bad Request"
      res.locals.errstatusCode = 400
      next(err)
    }

    //inserting object into database
    let insert1 = insertQueryHeader + "'" + videoGame.name + "', '" + videoGame.release_date 
      + "', '" + videoGame.developer + "', '" + videoGame.publisher + "', '" + videoGame.genre
      + "', " + videoGame.price + ", " + videoGame.metascore + ", "
      + videoGame.has_singleplayer.toUpperCase() + ", "
      + videoGame.has_multiplayer.toUpperCase() + `)
                                                    RETURNING *;`
    
    insertResult = await dbQuery(insert1)   //INSERT INTO GAMES
    //console.log(insert1)
    //insertResult = [{"id": 20, "bruh": "31"}]

    let insert2 = ""
    videoGame.platforms.forEach((platform) => {
      insert2 = insert2 + 
      `INSERT INTO PLATFORMS (platform, id_game) 
        VALUES (` + "'" + platform + "', " + insertResult[0].id + `);
                                                                                `
    })         
    await dbQuery(insert2)  //INSERT INTO PLATFORMS
    //console.log(insert2)

    if (videoGame.dlc.length > 0) {
      let insert3 = ""
      videoGame.dlc.forEach((dlcItem) => {
        insert3 = insert3 + 
        `INSERT INTO DLCS (dlc_name, dlc_release_date, dlc_price, id_game)
          VALUES (` + "'" + dlcItem.name + "', '" + dlcItem.release_date + "', " 
        + dlcItem.price + ", " + insertResult[0].id + `);
                                                      `
      })

      await dbQuery(insert3) //INSERT INTO DLCS
      //console.log(insert3)
    }

    sqlQuery = selectQueryHeader + `'` + videoGame.name + `'` + queryFooter
    result = await dbQuery(sqlQuery)

    responseEnvelope.status = "OK"
    responseEnvelope.message = "Zapis o video igri uspješno dodan"
    responseEnvelope.response = result
    res.json(responseEnvelope)
  } catch (err) { //non-specific error handling
    res.locals.errmessage = "Pogreška u dodavanju zapisa"
    next(err)
  }
})

/*
router.delete("/:id", async (req, res, next) => {
  responseEnvelope = {}
  let id = req.params.id
  try {
    result = await dbQuery(queryHeader +
      `WHERE GAMES.id = `
      + id
      + queryFooter)
    try {   //check if resource with given id exists
      if ((Array.isArray(result)) && (result.length == 0)) {
        throw new Error("")
      }
    } catch (err) {
      res.locals.errmessage = "Ne postoji resurs s danim ID-om"
      res.locals.errstatus = "Not Found"
      res.locals.errstatusCode = 404
      next(err)
    }
    let sqlQuery = deleteQueryHeader + result.id
    result = await dbQuery(sqlQuery)
    responseEnvelope.status = "OK"
    responseEnvelope.message = "Resurs uspješno dohvaćen"
    responseEnvelope.response = result
    res.json(responseEnvelope)
  } catch (err) {   //non-specific error handling
    res.locals.errmessage = "Pogreška u dohvaćanju resursa"
    next(err)
  }
}) */


module.exports = router