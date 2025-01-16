const express = require('express')

const dbQuery = require("../database/dbQuery")
const queryHeader = require("../database/queryHeaderWithId")
const queryFooter = require("../database/queryFooter")
const VideoGame = require("../data/schemas/video_game")
const Envelope = require('../data/schemas/envelope')
const selectQueryHeader = require("../database/resourceGet/selectQueryHeader.js")
const insertQueryHeader = require("../database/resourcePost/insertQueryHeader.js")
const deleteQueryHeader = require("../database/resourceDelete/deleteQueryHeader")
const deleteQueryFooter = require("../database/resourceDelete/deleteQueryFooter")
const ld = require("../data/schemas/ld.js")

const router = express.Router()

router.all("/", async (req, res, next) => {
  responseEnvelope = {}

  if (req.method === "GET") {
    try {
      resultJson = await dbQuery(queryHeader + queryFooter)
      var result = []
      resultJson.forEach(element => {
        result.push(Object.assign({}, ld, element))
      }); //JSON-LD implementation
      responseEnvelope.status = "OK"
      responseEnvelope.message = "Kolekcija uspješno dohvaćena"
      responseEnvelope.response = result
      res.json(responseEnvelope)
      return

    } catch (err) {
      res.locals.errmessage = "Pogreška u dohvaćanju kolekcije"
      next(err)
    }

  } else if (req.method === "POST") {

    try {
      try {
        //console.log(req.body)
        if (Object.keys(req.body).length === 0) { //if body is empty
          throw new Error("Tijelo zahtjeva je prazno")
        }

        let atrList = ["name", "release_date", "developer", "publisher", "platforms",
          "genre", "price", "metascore", "has_singleplayer", "has_multiplayer", "dlc"
        ]
        Object.keys(req.body).forEach((key) => {
          if (!atrList.includes(key)) {
            throw new SyntaxError("Atribut " + key + " nije atribut video igre")
          }
        })

        if (req.body.dlc) {
          atrList = ["name", "release_date", "price"]

          req.body.dlc.forEach((dlcItem) => {
            Object.keys(dlcItem).forEach((key) => {
              if (!atrList.includes(key)) {
                throw new SyntaxError("Atribut " + key + " nije atribut video dlca")
              }
            })
          })
        }

        var videoGame = new VideoGame(req.body.name, req.body.release_date, req.body.developer,
          req.body.publisher, req.body.platforms, req.body.genre, req.body.price,
          req.body.metascore, req.body.has_singleplayer, req.body.has_multiplayer,
          req.body.dlc, false)

      } catch (err) { //body syntax not properly definied
        if (!err.message) {
          res.locals.errmessage = "Objekt nije ispravno definiran"
        }
        res.locals.errstatus = "Bad Request"
        res.locals.errstatusCode = 400
        next(err)
        return
      }

      //checking if the same record already exists in database
      try {
        sqlQuery = selectQueryHeader + `'` + videoGame.name + `'` + queryFooter
        checkResult = await dbQuery(sqlQuery)
        if (checkResult.length > 0) {  //if result isn't empty, record already exists
          throw new Error("Zapis s identičnim imenom već postoji u bazi podataka")
        }
      } catch (err) {
        if (err.message) {
          res.locals.errmessage = err.message
        }
        res.locals.errstatus = "Bad Request"
        res.locals.errstatusCode = 400
        next(err)
        return
      }

      //inserting object into database
      let insert1 = insertQueryHeader + "'" + videoGame.name + "', '" + videoGame.release_date
        + "', '" + videoGame.developer + "', '" + videoGame.publisher + "', '" + videoGame.genre
        + "', " + videoGame.price + ", " + videoGame.metascore + ", "
        + videoGame.has_singleplayer.toUpperCase() + ", "
        + videoGame.has_multiplayer.toUpperCase() + `)
                                                      RETURNING *;`

      insertResult = await dbQuery(insert1)   //INSERT INTO GAMES

      let insert2 = ""
      videoGame.platforms.forEach((platform) => {
        insert2 = insert2 +
          `INSERT INTO PLATFORMS (platform, id_game) 
          VALUES (` + "'" + platform + "', " + insertResult[0].id + `);
                                                                                  `
      })
      await dbQuery(insert2)  //INSERT INTO PLATFORMS

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
      }

      sqlQuery = selectQueryHeader + `'` + videoGame.name + `'` + queryFooter
      var resultJson = await dbQuery(sqlQuery)
      var result = Object.assign({}, ld, resultJson[0])  //JSON-LD implementation

      responseEnvelope.status = "OK"
      responseEnvelope.message = "Zapis o video igri uspješno dodan"
      responseEnvelope.response = result
      res.json(responseEnvelope)
      return
    } catch (err) { //non-specific error handling
      res.locals.errmessage = "Pogreška u dodavanju zapisa"
      next(err)
    }

  }


})

router.all("/:id", async (req, res, next) => {
  responseEnvelope = {}
  let id = req.params.id

  if (req.method === "GET") {
    try {
      var resultJson = await dbQuery(queryHeader +
        `WHERE GAMES.id = `
        + id
        + queryFooter)
      try {
        if ((Array.isArray(result)) && (result.length == 0)) {
          throw new Error("")
        }
        responseEnvelope.status = "OK"
        responseEnvelope.message = "Resurs uspješno dohvaćen"
        var result = Object.assign({}, ld, resultJson[0])  //JSON-LD implementation
        responseEnvelope.response = result
        res.json(responseEnvelope)
        return
      } catch (err) {
        res.locals.errmessage = "Ne postoji resurs s danim ID-om"
        res.locals.errstatus = "Not Found"
        res.locals.errstatusCode = 404
        next(err)
        return
      }

    } catch (err) {   //non-specific error handling
      res.locals.errmessage = "Pogreška u dohvaćanju resursa"
      next(err)
      return
    }
  }


  else if (req.method === "PUT") {
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
        return
      }

      try {
        if (Object.keys(req.body).length === 0) { //if body is empty
          throw new Error("Tijelo zahtjeva je prazno")
        }

        let atrList = ["name", "release_date", "developer", "publisher", "platforms",
          "genre", "price", "metascore", "has_singleplayer", "has_multiplayer", "dlc"
        ]
        Object.keys(req.body).forEach((key) => {
          if (!atrList.includes(key)) {
            throw new SyntaxError("Atribut " + key + " nije atribut video igre")
          }
        })

        if (req.body.dlc) {
          atrList = ["name", "release_date", "price"]

          req.body.dlc.forEach((dlcItem) => {
            Object.keys(dlcItem).forEach((key) => {
              if (!atrList.includes(key)) {
                throw new SyntaxError("Atribut " + key + " nije atribut video dlca")
              }
            })
          })
        }

        var videoGame = new VideoGame(req.body.name, req.body.release_date, req.body.developer,
          req.body.publisher, req.body.platforms, req.body.genre, req.body.price,
          req.body.metascore, req.body.has_singleplayer, req.body.has_multiplayer,
          req.body.dlc, true)

        //updateing record with given id
        let update1 = `UPDATE GAMES SET 
          `
        propsWithQuotes = ["name", "release_date", "developer",
          "publisher", "genre"]
        //creating update GAMES statement
        let i = 0
        if (Object.hasOwn(videoGame, "platforms")) i += 1
        if (Object.hasOwn(videoGame, "dlc")) i += 1

        for (let prop in videoGame) {
          if (prop !== "platforms" && prop !== "dlc") {
            update1 = update1 + prop + " = "
            if (propsWithQuotes.indexOf(prop) >= 0) {   //if property with quotes
              update1 = update1 + "'" + videoGame[prop] + "'"
            } else {  //property without quotes
              update1 = update1 + videoGame[prop]
            }
            if ((i + 1) < Object.keys(videoGame).length) {
              update1 = update1 + ","
            }
            update1 = update1 + `
              `
            i += 1
          }
        }
        update1 = update1 + "WHERE id = " + id + `;
          `

        var sqlQuery = update1

        //creating update PLATFORMS statemenet
        if (Object.hasOwn(videoGame, "platforms")) {
          var delete2 = `DELETE FROM PLATFORMS WHERE id_game = ` + id + `;
            `
          var insert2 = ""
          videoGame.platforms.forEach((platform) => {
            insert2 = insert2 +
              `INSERT INTO PLATFORMS (platform, id_game) 
                VALUES (` + "'" + platform + "', " + id + `);
                `
          })
          sqlQuery = sqlQuery + delete2 + insert2
        }

        //creating update DLCS statement
        if (Object.hasOwn(videoGame, "dlc")) {
          var delete3 = `DELETE FROM DLCS WHERE id_game = ` + id + `;
            `
          var insert3 = ""
          videoGame.dlc.forEach((dlcItem) => {
            insert3 = insert3 +
              `INSERT INTO DLCS (dlc_name, dlc_release_date, dlc_price, id_game)
                VALUES (` + "'" + dlcItem.name + "', '" + dlcItem.release_date + "', "
              + dlcItem.price + ", " + id + `);
                `
          })
          sqlQuery = sqlQuery + delete3 + insert3
        }

        await dbQuery(sqlQuery)  //updateing record

        //fetch updated record
        var resultJson = await dbQuery(queryHeader +
          `WHERE GAMES.id = `
          + id
          + queryFooter)

        responseEnvelope.status = "OK"
        responseEnvelope.message = "Vrijednosti atributa resursa uspješno ažurirane"
        var result = Object.assign({}, ld, resultJson[0])  //JSON-LD implementation
        responseEnvelope.response = result
        res.json(responseEnvelope)

      } catch (err) { //body syntax not properly definied
        if (!err.message) {
          res.locals.errmessage = "Objekt nije ispravno definiran"
        }
        res.locals.errstatus = "Bad Request"
        res.locals.errstatusCode = 400
        next(err)
        return
      }

    } catch (err) {
      res.locals.errmessage = "Pogreška u brisanju resursa"
      next(err)
    }
  }


  else if (req.method === "DELETE") {
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
        return
      }
      //deleting resource with given id
      let sqlQuery = deleteQueryHeader + id + deleteQueryFooter
      var resultJson = await dbQuery(sqlQuery)
      responseEnvelope.status = "OK"
      responseEnvelope.message = "Resurs uspješno obrsian"
      var result = Object.assign({}, ld, resultJson[0])  //JSON-LD implementation
      responseEnvelope.response = result
      res.json(responseEnvelope)
      return
    } catch (err) {   //non-specific error handling
      res.locals.errmessage = "Pogreška u brisanju resursa"
      next(err)
      return
    }
  }
})

module.exports = router