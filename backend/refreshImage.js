const fs = require("node:fs")
const path = require('path')

const dbQuery = require('./database/dbQuery')
const queryHeader = require("./database/queryHeader")
const queryFooter = require("./database/queryFooter")

async function refreshImage(sid) {
  /* var userId = sid.split('|')[1]
  var folderPath = path.join(__dirname, "cache", userId)
  try { //creating user directory
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    } else {
      console.log(folderPath, "already exists")
    }
  } catch (err) {
    console.log(err)
  } */

  var folderPath = path.join(__dirname, "cache")
  var csvPath = path.join(folderPath, "video-igre.csv")
  var jsonPath = path.join(folderPath, "video-igre.json")

  //send query to db
  var query = queryHeader + queryFooter
  try {
    resultJson = await dbQuery(query)
    console.log(resultJson)
    
    //writing json file
    fs.writeFileSync(jsonPath, JSON.stringify(resultJson, null, "  "), (err) => {
      if (err) {
        console.error(err)
      } else {
      }
    })

    //converting result to csv
    let csvData = ""
    let newline = true
    for (let key in rows) {
      if (!newline) {
        csvData += ","
      } else {
        newline = false
      }
      key = key.split(".")
      csvData += key[1]

    }
    csvData += "\n"

    for (let i in resultJson) {
      let obj = resultJson[i]
      let platformIterate = 0
      let dlcIterate = 0
      for (let j in obj) {    //count how many times parent information will need to be repeated
        let value = obj[j]
        if (j == "platforms") {
          platformIterate = value.length
        } else if (j == "dlc") {
          dlcIterate = Math.max(value.length, 1)
        }
      }

      for (let x = 0; x < platformIterate; x++) {
        for (let y = 0; y < dlcIterate; y++) {
          let newLine = true
          for (let k in obj) {
            if (!newLine) {
              csvData += ","
            } else {
              newLine = false
            }
            let value = obj[k]
            if (k == "platforms") {
              csvData += value[x]
            } else if (k == "dlc") {
              if ((typeof value[y] === 'undefined') || (Object.keys(value[y]).length == 0)) {        //if object empty
                csvData += ",,"
              } else {
                let addComma = false
                let currentObject = value[y]
                for (let l in currentObject) {  //iterating over specific dlc object
                  if (addComma) {
                    csvData += ","
                  } else {
                    addComma = true
                  }
                  csvData += currentObject[l]
                }
              }
            } else {
              csvData += value
            }
          }
          csvData += "\n"
        }
      }
    }

    //write csv file
    fs.writeFileSync(csvPath, csvData, (err) => {
      if (err) {
        console.error(err)
      } else {

      }
    })
  } catch (err) {
    console.log(err)
  }


}

module.exports = refreshImage